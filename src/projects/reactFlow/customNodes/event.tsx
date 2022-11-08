import React from "react"
import {Handle, Position} from "reactflow"

export function eventNode({data}: {data: any}) {
    const labelTextContent = data.label.replaceAll("_", " ").replaceAll("}", "").split("{")
    return (
        <div className="event-node">
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
