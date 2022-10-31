import React from 'react';
import { Handle, Position } from 'reactflow';

const handleStyleStart = { left: 10, backgroundColor:'red', borderRadius: '2px', width: '10px', height: '10px' };
const handleStyleDuring = { left: 30, backgroundColor:'green', borderRadius: '2px', width: '10px', height: '10px' };
const handleStyleEnd = { left: 50, backgroundColor:'blue', borderRadius: '2px', width: '10px', height: '10px' };

export function TextUpdaterNode({ data }) {
    return (
        <div className="text-updater-node">
            <Handle type="target" position={Position.Top} id="start" style={handleStyleStart} />
            <Handle type="target" position={Position.Top} id="during" style={handleStyleDuring}/>
            <Handle type="target" position={Position.Top} id="end" style={handleStyleEnd}/>
            <div>
                <label htmlFor="text">{data.label}</label>
            </div>
            <Handle type="source" position={Position.Bottom} id="start" style={handleStyleStart} />
            <Handle type="source" position={Position.Bottom} id="during" style={handleStyleDuring} />
            <Handle type="source" position={Position.Bottom} id="end" style={handleStyleEnd} />
        </div>
  );
}