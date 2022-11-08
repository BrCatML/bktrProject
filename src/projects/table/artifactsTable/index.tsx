import {countEvaluationType, tableDataType, filtertype} from "../types"
import ComponentContent from "../componentContent"
// import {infoContent} from "./InfoContent"
import type {ColumnsType} from "antd/es/table/interface"
import Table from "antd/es/table"
import Radio from "antd/es/radio"
import {RadioChangeEvent} from "antd/es/radio"
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined"
import React from "react"

interface artifactsTableProps {
    data: tableDataType[]
    evaluation: countEvaluationType
    filtersOfIncident?: filtertype[]
    loading: boolean
    footer?: JSX.Element
    setSeletedKeys: (newKeys: React.Key[]) => void
    updateVal: (item: tableDataType, value: any) => void
}

const RadioGroupOption = [
    {label: <QuestionCircleOutlined />, value: "no"},
    {label: "TP", value: "TP"},
    {label: "TN", value: "TN"},
]

const ArtifactsTable = (props: artifactsTableProps) => {
    const columns: ColumnsType<tableDataType> = [
        // {
        //     title: "Приложение",
        //     dataIndex: "content",
        //     key: "content",
        //     width: 100,
        //     align: "center",
        //     render: (content: string[], itemData) => {
        //         return <ComponentContent content={content} itemData={itemData} />
        //     },
        // },
        {
            title: "Incident",
            dataIndex: "name",
            key: "incident",
            width: 300,
            filters: props.filtersOfIncident, //getFilterForName(props.data),
            filterSearch: true,
            //@ts-ignore
            onFilter: (value: string, record) => record.name.includes(value),
        },
        {
            title: "Confidence",
            dataIndex: "confidence",
            key: "confidence",
            width: 100,
            align: "center",
            sorter: (a, b) => a.confidence - b.confidence,
            render: (confidence: number) => {
                return <>{confidence.toFixed(3)}</>
            },
        },
        {
            title: "Время",
            dataIndex: "seconds",
            key: "seconds",
            width: 250,
            align: "center",
            render: (seconds) => {
                const viewDate = new Date(seconds).toLocaleString()
                return <>{viewDate}</>
            },
            sorter: (a, b) => a.seconds - b.seconds,
        },
        {
            title: "Камера",
            dataIndex: "camera",
            key: "camera",
            width: 300,
        },
        {
            title: "Оценка",
            dataIndex: "evaluation",
            key: "evaluation",
            width: 200,
            align: "center",
            render: (values, itemData) => {
                return (
                    <Radio.Group
                        options={RadioGroupOption}
                        onChange={(f) => onChangeEvaluation(f, itemData)}
                        value={values}
                        optionType="button"
                    />
                )
            },
        },
    ]

    const onChangeEvaluation = ({target: {value}}: RadioChangeEvent, item: tableDataType) => {
        // item.evaluation = value
        props.updateVal(item, value)
    }

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            props.setSeletedKeys(selectedRowKeys)
        },
    }

    return props.loading ? (
        <div style={{textAlign: "center", margin: 100}}>Loading data...</div>
    ) : (
        <Table
            showSorterTooltip={false}
            columns={columns}
            dataSource={props.data}
            footer={props.footer ? () => props.footer : undefined}
            rowSelection={{
                type: "checkbox",
                ...rowSelection,
            }}
        />
    )
}

export default ArtifactsTable
