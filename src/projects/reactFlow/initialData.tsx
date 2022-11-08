import {MarkerType} from "reactflow"
const stepY: number = 100
const stepX: number = 170
const colorStart = "green"
const colorDuring = "blue"
const colorEnd = "red"

function getSourceHandle(str: string) {
    return str.indexOf("!") == -1 && str.indexOf("alive==False") == -1 ? "start" : "end"
}

export async function getConfigData(url: string) {
    let gotData: any
    gotData = await fetch(url)
        .then((res) => res.json())
        .catch(console.log)
    // .finally(() => setLoading(false))
    return gotData
}

function getSourceData(str: string, validNodes: Set<string>) {
    const handle = getSourceHandle(str)
    const namesLine = str
        .replace(str.substring(str.indexOf("["), str.indexOf("]") + 1), "")
        .split("/")
        .join("")
    // const namesLine = str.split("/").join("")
    const names = namesLine.split("|")
    //получили массив одиночных значений с ! и .* и ^
    return names.map((namesItem) => {
        let name = namesItem.replace("!", "")
        let needRegExp = ""
        if (name.indexOf(".*") != -1 || name.indexOf(".+") != -1) {
            needRegExp = name
            name = ""
        } else if (!validNodes.has((name = name.replace("^", "")))) {
            validNodes.add(name)
        }
        return {name, handle, needRegExp}
    })
}

export function getInitData(TestData: any) {
    // const TestData = testData
    // console.log('Начальные данные.incidents:',testData.incidents)
    // console.log('___________________')

    let nodes: any[] = []
    let edgesReg: any[] = []
    let edges: any[] = []

    let validEdges = new Set(["start", "during", "end"])
    let validNodes = new Set<string>([])

    for (const nodeName in TestData.incidents) {
        // console.log('n>>>>',nodeName,'>>',TestData.incidents[nodeName].position)

        for (let edgeItem in TestData.incidents[nodeName]) {
            if (!validEdges.has(edgeItem)) continue
            if (!(TestData.incidents[nodeName][edgeItem].incident || TestData.incidents[nodeName][edgeItem].event))
                continue
            if (!validNodes.has(nodeName)) validNodes.add(nodeName)

            const source = [
                TestData.incidents[nodeName][edgeItem].incident,
                TestData.incidents[nodeName][edgeItem].event,
            ]

            source.map((sourceNamesItem) => {
                if (!sourceNamesItem) return

                getSourceData(sourceNamesItem, validNodes).map((sourceName) => {
                    if (sourceName.needRegExp == "") {
                        edges.push({
                            source: sourceName.name,
                            sourceHandle: sourceName.handle,
                            target: nodeName,
                            targetHandle: edgeItem,
                            data: TestData.incidents[nodeName][edgeItem],
                        })
                    } else {
                        edgesReg.push({
                            needRegExp: new RegExp(sourceName.needRegExp),
                            sourceHandle: sourceName.handle,
                            target: nodeName,
                            targetHandle: edgeItem,
                            data: TestData.incidents[nodeName][edgeItem],
                        })
                    }
                })
            })
        }
    }
    //теперь у нас готов перечень узлов и остались только регулярки
    for (const EdgesRegItem of edgesReg) {
        validNodes.forEach((v1) => {
            if (v1.match(EdgesRegItem.needRegExp)) {
                edges.push({
                    source: v1,
                    sourceHandle: EdgesRegItem.sourceHandle,
                    target: EdgesRegItem.target,
                    targetHandle: EdgesRegItem.targetHandle,
                    data: EdgesRegItem.data,
                })
            }
        })
    }
    //доделаем список узлов:
    let ii = 0
    let ii2 = 0
    validNodes.forEach((v1) => {
        const nodeItem: {
            id: string
            data: {label: string; dataId?: any}
            position: {x: number; y: number}
            type: string
        } = {
            id: v1,
            data: {label: v1, dataId: undefined},
            position: {x: ii, y: -2},
            type: "incident",
        }

        if (TestData.incidents[v1]) {
            if (TestData.incidents[v1].position) {
                nodeItem.position = TestData.incidents[v1].position
            } else {
                ii2 = ii2 + 1
                nodeItem.position = {x: ii * stepX, y: ii2 * stepY}
            }
            // nodeItem.position = TestData.incidents[v1].position ? TestData.incidents[v1].position : {x: 0, y: ii}
            nodeItem.data.dataId = TestData.incidents[v1]
        } else {
            ii = ii + 1
            ii2 = 0
            nodeItem.type = "event"
            nodeItem.position.y = nodeItem.position.y * stepY
            nodeItem.position.x = nodeItem.position.x * stepX
        }
        nodes.push(nodeItem)
    })

    nodes.sort((a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    })

    edges.map((v, i) => {
        const colorEdge = v.sourceHandle == "start" ? colorStart : v.sourceHandle == "during" ? colorDuring : colorEnd
        v.id = i.toString()
        v.style = {stroke: `${colorEdge}`}
        v.markerEnd = {type: MarkerType.ArrowClosed, color: `${colorEdge}`}
    })

    // console.log('___________________')
    // console.log('validNodes',validNodes)
    // console.log('edgesReg',edgesReg)
    // console.log('nodes',nodes)
    // console.log('edges',edges)
    return {nodes, edges}
}

export function convertToEnterData(nodes: any[], edges: any[]) {
    let convertedData: any = {incidents: {}}
    console.log("nodes", nodes)
    console.log("edges", edges)

    nodes.map((v) => {
        if (v.data.dataId) {
            convertedData.incidents[v.id] = {
                // position: {x: +(v.position.x / stepX).toFixed(5), y: +(v.position.y / stepY).toFixed(5)},
                position: {x: +v.position.x.toFixed(5), y: +v.position.y.toFixed(5)},
                oldData: v.data.dataId,
            }
        }
    })

    edges.map((v) => {
        convertedData.incidents[v.target][v.targetHandle]
            ? (convertedData.incidents[v.target][v.targetHandle].incident = `${
                  convertedData.incidents[v.target][v.targetHandle].incident
              } | ${v.source}`)
            : (convertedData.incidents[v.target][v.targetHandle] = {incident: v.source})
    })
    console.log("выходные данные", convertedData)

    return convertedData
}
