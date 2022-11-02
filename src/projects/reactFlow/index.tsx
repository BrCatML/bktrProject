import React, {useEffect, useRef, useState} from "react"
import ReactFlow, {Controls, Background, MiniMap, updateEdge, MarkerType, ReactFlowProvider} from "reactflow"
import "reactflow/dist/style.css"
import "./updatenode.css"

// import {convertToEnterData} from "./initialNodesEdges"
import {convertToEnterData, getConfigData, getInitData} from "./initialData"

import {useCallback} from "react"
import {addEdge, applyEdgeChanges, applyNodeChanges} from "reactflow"
import "reactflow/dist/style.css"

import {incidentNode} from "./customNodes/incident"
import {eventNode} from "./customNodes/event"

import {Button} from "antd"
import Sidebar from "./sidebar" // в нем кнопка, которая создает новый node, пока не удаляю
import testData from '../../static/testData'

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {incident: incidentNode, event: eventNode}

function Flow() {
    const [incidentConfig, setIncidentConfig] = useState<any>(null)
    const reactFlowWrapper = useRef<any>(null)
    const [nodes, setNodes] = useState<any>([])
    const [edges, setEdges] = useState<any>([])
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
    const edgeUpdateSuccessful = useRef(true)

    useEffect(() => {
        // getConfigData("/api/config/inspector/?transform=false").then(setIncidentConfig)
        setIncidentConfig(testData)
    }, [])
    useEffect(() => {
        if (incidentConfig) {
            const initDataApi = getInitData(incidentConfig)
            setNodes(initDataApi.nodes)
            setEdges(initDataApi.edges)
        }
    }, [incidentConfig])

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
        [setNodes],
    )
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        [setEdges],
    )
    const onConnect = useCallback(
        (connection: any) => {
            const colorStart = "green"
            const colorDuring = "blue"
            const colorEnd = "red"

            console.log(connection)
            const colorEdge =
                connection.sourceHandle == "start"
                    ? colorStart
                    : connection.sourceHandle == "during"
                    ? colorDuring
                    : colorEnd
            connection.markerEnd = {type: MarkerType.ArrowClosed, color: `${colorEdge}`}
            connection.style = {stroke: `${colorEdge}`}
            return setEdges((eds: any) => addEdge(connection, eds))
        },
        [setEdges],
    )

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false
    }, [])

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true
        setEdges((els: any) => updateEdge(oldEdge, newConnection, els))
    }, [])

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds: any) => eds.filter((e: any) => e.id !== edge.id))
        }
        edgeUpdateSuccessful.current = true
    }, [])

    const onDragOver = useCallback((event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
    }, [])

    const onDrop = useCallback(
        (event) => {
            event.preventDefault()
            if (reactFlowWrapper.current == null) return
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
            const type = event.dataTransfer.getData("application/reactflow")
            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return
            }

            const position = reactFlowInstance
                ? reactFlowInstance.project({
                      x: event.clientX - reactFlowBounds.left,
                      y: event.clientY - reactFlowBounds.top,
                  })
                : {x: 10, y: 10}
            const newNode = {
                id: getId(),
                type,
                position,
                data: {label: `${type} node`},
            }

            setNodes((nds: any) => nds.concat(newNode))
        },
        [reactFlowInstance],
    )

    let id = 0
    const getId = () => `dndnode_${id++}`

    return (
        <>
            <ReactFlowProvider>
                <div className="parent-reackflow-style" style={{color: "black"}} ref={reactFlowWrapper}>
                    {/* <div className="reactflow-wrapper" style={{height: 800, width: 800}} ref={reactFlowWrapper}> */}
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onEdgeUpdate={onEdgeUpdate}
                        onEdgeUpdateStart={onEdgeUpdateStart}
                        onEdgeUpdateEnd={onEdgeUpdateEnd}
                        nodeTypes={nodeTypes}
                        fitView //располагает схему по размеру экрана
                        minZoom={0.1}
                        maxZoom={16}
                        // onDrop={onDrop}
                        // onDragOver={onDragOver}
                        // onInit={setReactFlowInstance}
                    >
                        <Background />
                        <Controls />
                        <MiniMap style={{height: 120}} />
                    </ReactFlow>
                    {/* <Sidebar /> */}
                    {/* </div> */}
                    <Button
                        onClick={() => {
                            console.log(incidentConfig.data)
                            convertToEnterData(nodes, edges)
                        }}
                    >
                        watch current json in console
                    </Button>
                </div>
            </ReactFlowProvider>
        </>
    )
}

export default Flow
