import testData from "../../static/testData"
import {MarkerType} from "reactflow"

function regExpFromString(str: string) {
    const match = str.match(new RegExp("^/(.*?)/([gimy]*)$"))
    if (match) return new RegExp(match[1])

    return new RegExp(str)
}

export const initialData = ff(testData)

function ff(TestData: any) {
    let nodes: any[] = []
    let edgesList: any[] = []
    let edges: any[] = []

    const validEdges = new Set(["start", "during", "end"])

    for (let nodeName in TestData.incidents) {
        // nodes.push({id: nodeName, text: nodeName})
        nodes.push({id: nodeName, data: {label: nodeName}, position: {x: 100, y: 100}})

        for (let edgeItem in TestData.incidents[nodeName]) {
            if (!validEdges.has(edgeItem)) continue

            if (TestData.incidents[nodeName][edgeItem].incident) {
                edgesList.push({
                    id: `${TestData.incidents[nodeName][edgeItem].incident}-${nodeName}`,
                    source: TestData.incidents[nodeName][edgeItem].incident.replaceAll("!", ""),
                    target: nodeName,
                    data: {
                        type: edgeItem,
                        type2:
                            TestData.incidents[nodeName][edgeItem].incident[0] == "!" ||
                            TestData.incidents[nodeName][edgeItem].incident[1] == "!"
                                ? "!"
                                : undefined,
                    },
                })
            }
        }
    }

    edgesList.forEach((v) => {
        // console.log(v)
        for (let node of nodes) {
            if (v.source) {
                // if (v.source.indexOf('/') == -1 ) v.source = `^${v.source}`
                const reg = regExpFromString(v.source.replace(/\{.*}/g, "{.*}"))
                let mjjj = node.id.match(reg)
                // console.log(v.source,node.id, mjjj && v.source[0] == '/' || v.source[0] != '/' && v.source == node.id,mjjj)
                if (mjjj && v.source[0] == '/' || v.source[0] != '/' && v.source == node.id ) {
                    edges.push({
                        id: `${v.data.type}-${node.id}-${v.target}`,
                        source: node.id,
                        target: v.target,
                        data: v.data,
                    })
                }
            }
        }
    })

    // расположение вертикально
    nodes.map((v, i) => {
        v.position.y = v.position.y + i * 60
        v.position.x = v.position.x + i * 60
        v.type = "textUpdater"
        // console.log(i,v.position,v.position.x)
    })

    const colorStart = "red"
    const colorDuring = "green"
    const colorBlue = "blue"

    edges.map((v, i) => {
        const colorEdge = v.data.type == "start" ? colorStart : v.data.type == "during" ? colorDuring : colorBlue
        // console.log(v)
        v.style = {stroke: `${colorEdge}`}
        v.type = "smoothstep"
        v.markerEnd = {type: MarkerType.ArrowClosed, color: `${colorEdge}`}
        v.sourceHandle = v.data.type
        v.targetHandle = v.data.type
    })

    return {nodes, edges}
}

export const initialNodes = [
    {id: "1", data: {label: "Nide 1"}, position: {x: 100, y: 100}},
    {id: "2", data: {label: "Node 2"}, position: {x: 100, y: 200}},
]

export const initialEdges = [{id: "e1-2", source: "1", target: "2"}]
