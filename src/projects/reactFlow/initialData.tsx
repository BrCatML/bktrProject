import testData from "../../static/testData"

function regExpFromString(str: string) {
    const match = str.match(new RegExp("^/(.*?)/([gimy]*)$"))
    return new RegExp(
        (match ? match[1] : str)
            .split("|")
            .map((v) => v.replace(/\{.*}/g, "{.*}"))
            .join("|"),
    )
}

export function getInitData () {
    const TestData = testData
    console.log('Начальные данные.incidents:',testData.incidents)

    let nodes: any[] = []
    let edgesList: any[] = []
    let edges: any[] = []

    let validEdges = new Set(["start", "during", "end"])
    let validNodes = new Set<string>([])

    // validEdges.add('sdf')

    for (let nodeName in TestData.incidents) {
        // nodes.push({id: nodeName, data: {label: nodeName}, position: {x: 100, y: 100}})
        console.log(`nodeName ${nodeName}`,TestData.incidents[nodeName] )
        for (let edgeItem in TestData.incidents[nodeName]) {
            if (!validEdges.has(edgeItem) ) continue
            if (!(TestData.incidents[nodeName][edgeItem].incident || TestData.incidents[nodeName][edgeItem].event)) continue

            const source = [TestData.incidents[nodeName][edgeItem].incident, TestData.incidents[nodeName][edgeItem].event ]
            if (!validNodes.has(nodeName)) validNodes.add(nodeName)

            source.map((v,i) => {
                if (!v) return
                if (v[0] != '/' && v[1] != '/' && !validNodes.has(v.replaceAll("!", ""))) validNodes.add(v.replaceAll("!", ""))
                edges.push({
                    source: v[0] != '/' && v[1] != '/' ? v.replaceAll("!", "") : '',
                    sourceHandle: v[0] == '!' ? 'end' : 'start',
                    target: nodeName,
                    targetHandle: edgeItem,
                    needRegExp: v[0] == '/' || v[1] == '/' ? v : '',
                    data: TestData.incidents[nodeName][edgeItem]
                })
                // console.log('>>>>>',v)
            })
        }
        

    }

    console.log('___________________')
    console.log('validNodes',validNodes)
    console.log('edgesList',edgesList)
    console.log('nodes',nodes)
    console.log('edges',edges)
    return '|________ok________|'
}