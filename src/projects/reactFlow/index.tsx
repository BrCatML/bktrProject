import React, {useEffect, useState} from "react"
import ReactFlow, {useNodesState, useEdgesState, Controls, Background, MiniMap, useNodes} from "reactflow"
import "reactflow/dist/style.css"
import "./updatenode.css"

// import {initialData} from "./initialNodesEdges"
// import {useCallback} from "react"
// import {addEdge, applyEdgeChanges, applyNodeChanges} from "reactflow"
// import "reactflow/dist/style.css"

// import {TextUpdaterNode} from "./customNodes/incident"

// import "./customNodes/text-updater-noe.css"


// // we define the nodeTypes outside of the component to prevent re-renderings
// // you could also use useMemo inside the component
// const nodeTypes = {textUpdater: TextUpdaterNode}

// function Flow() {
//     // const nodesss = useNodes();
//     const [nodes, setNodes] = useState(initialData.nodes)
//     const [edges, setEdges] = useState(initialData.edges)

//     const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
//     const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges])
//     const onConnect = useCallback((connection: any) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

//     function gg() {
//         // console.log('nodes',nodes)
//         // console.log("edges", edges)
//         let convertedData: any = { "incidents": {}}
//         nodes.map((v,i) => {
//             // console.log(v)
//             convertedData.incidents[v.id] = {}
//         })
//         edges.map((v,i) => {
//             // console.log(convertedData.incidents[v.target])
//             convertedData.incidents[v.target][v.targetHandle] 
//             ? (
//                 // console.log('Y'),
//                 convertedData.incidents[v.target][v.targetHandle].incident = `${convertedData.incidents[v.target][v.targetHandle].incident} | ${v.source}`
//               )
//             : (
//                 // console.log('N'),
//                 convertedData.incidents[v.target][v.targetHandle] = {incident : v.source}
//               )
//             // convertedData.incidents[v.target][v.targetHandle] = {incident : v.source}
//         })
//         // console.log(convertedData)
//     }

//     return (
//         <>
//             <div className="parent-reackflow-style" style={{color: "black"}}>
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     nodeTypes={nodeTypes}
//                     fitView //располагает схему по размеру экрана
//                     minZoom={0.1}
//                     maxZoom={16}
//                 >
//                     <Background />
//                     <Controls />
//                     <MiniMap style={{height: 120}} />
//                 </ReactFlow>
//                 <Button onClick={gg}>watch current json in console</Button>
//             </div>
//         </>
//     )
// }

import {Button} from "antd"
import {getInitData} from "./initialData"
const bbb = () => {
    return (
        <div className="index-style ">
        <div style={{margin: 'auto'}}>
            <Button onClick={() => {console.log(getInitData())}}>sdf</Button>
            <h1>B K T R</h1>
        </div>
        </div>
    )
}

export default bbb
