import React from "react"
import {Handle, Position} from "reactflow"

export function incidentNode({data}: {data: any}) {
    const labelTextContent = data.label.replaceAll("_", " ").replaceAll("}", "").split("{")
    return (
        <div className="incident-node">
            <Handle
                type="target"
                className="incident-target start"
                position={Position.Top}
                id="start"
                style={{left: 10}}
            />
            <Handle
                type="target"
                className="incident-target during"
                position={Position.Top}
                id="during"
                style={{left: 30}}
            />
            <Handle type="target" className="incident-target end" position={Position.Top} id="end" style={{left: 50}} />
            <div>
                {labelTextContent.map((v: string, i: number) => (
                    <label key={i}>{v}</label>
                ))}
            </div>
            <Handle
                type="source"
                className="incident-target start"
                position={Position.Bottom}
                id="start"
                style={{left: 20}}
            />
            {/* <Handle
                type="source"
                className="incident-target during"
                position={Position.Bottom}
                id="during"
                style={{left: 40}}
            /> */}
            <Handle
                type="source"
                className="incident-target end"
                position={Position.Bottom}
                id="end"
                style={{left: 60}}
            />
        </div>
    )
}

// const colorStart = "green"
// const colorDuring = "blue"
// const colorEnd = "red"

// const handleStyleStart = {
//     left: 10,
//     backgroundColor: `${colorStart}`,
//     borderRadius: "2px",
//     width: "10px",
//     height: "10px",
// }
// const handleStyleDuring = {
//     left: 30,
//     backgroundColor: `${colorDuring}`,
//     borderRadius: "2px",
//     width: "10px",
//     height: "10px",
// }
// const handleStyleEnd = {
//     left: 50,
//     backgroundColor: `${colorEnd}`,
//     borderRadius: "2px",
//     width: "10px",
//     height: "10px"
// }

// const handleStyleStartLeft = { top: 1, backgroundColor: `${colorStart}`, borderRadius: "2px", width: "10px", height: "10px"}
// const handleStyleDuringLeft = {left: 20, backgroundColor: `${colorDuring}`, borderRadius: "2px", width: "10px", height: "10px"}
// const handleStyleEndLeft = {left: 40, backgroundColor: `${colorEnd}`, borderRadius: "2px", width: "10px", height: "10px"}

// const handleStyleStartRight = {left: 60, backgroundColor: `${colorStart}`, borderRadius: "2px", width: "10px", height: "10px"}
// const handleStyleDuringRight = {left: 80, backgroundColor: `${colorDuring}`, borderRadius: "2px", width: "10px", height: "10px"}
// const handleStyleEndRight = {  backgroundColor: `${colorEnd}`, borderRadius: "2px", width: "10px", height: "10px"}

// export function TextUpdaterNode({data}: {data: any}) {
//     // console.log(data)
//     const labelTextContent = data.label.replaceAll("_", " ").replaceAll("}", "").split("{")
//     console.log(handleStyleEnds , handleStyleEndd)
//     return (
//         <div className="text-updater-node">
//             <Handle type="target" position={Position.Top} id="start" style={handleStyleStart } />
//             <Handle type="target" position={Position.Top} id="during" style={handleStyleDuring} />
//             <Handle type="target" position={Position.Top} id="end" style={handleStyleEnd} />
//             <div>
//                 {labelTextContent.map((v: string, i: number) => (
//                     <label key={i}>{v}</label>
//                 ))}
//             </div>
//             <Handle type="source" position={Position.Bottom} id="start" style={handleStyleStart} />
//             <Handle type="source" position={Position.Bottom} id="during" style={handleStyleDuring} />
//             <Handle type="source" position={Position.Bottom} id="end" style={handleStyleEnd} />
//         </div>
//     )
// }
