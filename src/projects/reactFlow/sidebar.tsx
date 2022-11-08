import React from "react"
import {Button} from "antd"

export default () => {
    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData("application/reactflow", nodeType)
        event.dataTransfer.effectAllowed = "move"
    }
    return (
        <aside>
            <Button onDragStart={(event) => onDragStart(event, "incident")} draggable>
                Default Node
            </Button>
        </aside>
    )
}
