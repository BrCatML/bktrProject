import Card from "antd/es/card"
import Modal from "antd/es/modal"
import Image from "antd/es/image"
import FileTextFilled from "@ant-design/icons/FileTextFilled"
import {tableDataType} from "../types"
import {isErrorTypeContent} from "../index"
import React from "react"

export const infoContent = (itemData: tableDataType) => {
    Modal.info({
        title: `Content: ${itemData.name}: ${new Date(itemData.seconds).toLocaleString()}`,
        icon: undefined,
        width: window.innerWidth * 0.9,
        maskClosable: true,
        content: (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                <Image.PreviewGroup>
                    {itemData.content.map((v, i) => {
                        return (
                            <div key={i}>
                                <Card
                                    hoverable
                                    style={{width: "240px", border: "10px", margin: "20px"}}
                                    cover={
                                        isErrorTypeContent(v) ? (
                                            <a
                                                style={{display: "flex", justifyContent: "center", color: "black"}}
                                                href={`/api/${itemData.path}/${v}`}
                                                target="_blank"
                                            >
                                                <FileTextFilled style={{fontSize: 70, padding: "30px"}} />
                                            </a>
                                        ) : (
                                            <Image alt="example" src={`/api/${itemData.path}/${v}`} />
                                        )
                                    }
                                >
                                    <a href={`/api/${itemData.path}/${v}`} target="_blank">
                                        <Card.Meta description={v} />
                                    </a>
                                </Card>
                            </div>
                        )
                    })}
                </Image.PreviewGroup>
            </div>
        ),
        onOk() {},
    })
}
