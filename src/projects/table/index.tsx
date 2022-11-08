import React, {useEffect, useState} from "react"
import {artefactResponce, countEvaluationType, tableDataType, typeArtType, filtertype} from "./types"
import ArtifactsTable from "./artifactsTable"
import FileImageOutlined from "@ant-design/icons/FileImageOutlined"
import WarningOutlined from "@ant-design/icons/WarningOutlined"
import GlobalOutlined from "@ant-design/icons/GlobalOutlined"
import type {RangePickerProps} from "antd/es/date-picker"
import Menu, {MenuProps} from "antd/es/menu"
import DatePicker from "antd/es/date-picker"
import Space from "antd/es/space"
import moment from "moment"
import message from 'antd/es/message'
import FooterPanel from "./footerPanel"
// // @ts-ignore
// import yaml from "js-yaml"
// // @ts-ignore
// import {saveAs} from "file-saver"
import initData from './static/testData'

const {RangePicker} = DatePicker

export const nameLog: string = "errors.log"
export function isErrorTypeContent(typeCont: string): boolean {
    return typeCont == nameLog ? true : false
}

export function getFilterForName(list: tableDataType[]): filtertype[] | undefined {
    const filterItems: filtertype[] | undefined = []
    const dataItem: Array<string> = []
    list.map((value: tableDataType) => {
        dataItem.push(value["name"])
    })
    let filteredItems = [...new Set(dataItem)]
    filteredItems.map((val: string) => {
        filterItems.push({
            text: val,
            value: val,
        })
    })
    return filterItems.length ? filterItems : undefined
}

const downloadStatictic = (list: tableDataType[]) => {
    const toDownload: any = {date: `${new Date().toLocaleString()}`}
    const finalEvaluation: countEvaluationType = {TP: 0, TN: 0}
    getFilterForName(list)?.forEach((nameArt) => {
        const itemEvaluation: countEvaluationType = {TP: 0, TN: 0}
        list.map((nameInData) => {
            if (nameArt.text == nameInData.name) {
                if (nameInData.evaluation == "TN") {
                    itemEvaluation.TN++
                } else if (nameInData.evaluation == "TP") {
                    itemEvaluation.TP++
                }
            }
        })
        toDownload[nameArt.text] = itemEvaluation
        finalEvaluation.TN += itemEvaluation.TN
        finalEvaluation.TP += itemEvaluation.TP
    })
    toDownload["itog"] = finalEvaluation
    message.warning('Загрузка на компьютер отключена в рамках данного проекта. Данные выводятся в консоль.')
    console.log(toDownload)
    // saveAs(
    //     new Blob([yaml.dump(toDownload)], {type: "application/x-yaml;charset=utf-8"}),
    //     `${toDownload.date}__${location.hostname}_${new Date().toJSON()}.yml`,
    // )
}

async function getData () {
    const ff : artefactResponce[] = initData
    return ff
}

function menuTable() {
    const [artifactsData, setArtifactsData] = useState<tableDataType[]>([]) //данные без фильтрации
    const [loading, setLoading] = useState<boolean>(true)
    const [current, setCurrent] = useState("all")
    const [defaultDateRange, setDefaultDateRange] = useState<[moment.Moment, moment.Moment]>([moment(), moment()])
    const [currentDateRange, setCurrentDateRange] = useState<number[]>([0, 0])
    const [list, setList] = useState<tableDataType[]>([]) //данные после фильтрации
    const [evaluation, setEvaluation] = useState<countEvaluationType>({TP: 0, TN: 0})
    const [seletedKeys, setSeletedKeys] = useState<React.Key[]>([])

    async function apiArtifacts() {
        const gotData: artefactResponce[] = await getData()  // await fetch("/api/artifacts/")
            .then((res) => res) //res.json())
            // .catch(console.error)
            .finally(() => setLoading(false))
        gotData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        const initialCurrentDateRange = [
            new Date(gotData[0].date).getTime(),
            new Date(gotData[gotData.length - 1].date).getTime(),
        ]
        setDefaultDateRange([moment(new Date(gotData[0].date)), moment(new Date(gotData[gotData.length - 1].date))])
        setCurrentDateRange(initialCurrentDateRange)

        const data: tableDataType[] = getInitialList(gotData, current, initialCurrentDateRange)
        return data
    }

    useEffect(() => {
        apiArtifacts().then(setArtifactsData)
    }, [])
    useEffect(() => {
        getFilteredList(artifactsData, current, currentDateRange)
    }, [artifactsData])

    const DateTimeRangePicker: React.FC = () => (
        <Space direction="vertical" size={12} style={{marginLeft: "20px"}}>
            <RangePicker
                ranges={{
                    "Default range": defaultDateRange,
                }}
                showTime
                format="DD.MM.YYYY HH:mm:ss"
                onChange={onChange}
                allowClear={false}
                disabledDate={(currentDate: moment.Moment) => {
                    return currentDate < moment(defaultDateRange[0]) || currentDate > moment(defaultDateRange[1])
                }}
                defaultValue={[moment(currentDateRange[0]), moment(currentDateRange[1])]}
            />
        </Space>
    )

    const onChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
        if (!dates) return
        dates[0] && dates[1]
            ? setCurrentDateRange([dates[0].toDate().getTime(), dates[1].toDate().getTime()])
            : setCurrentDateRange([0, 0])
    }

    const items: MenuProps["items"] = [
        {
            label: "Все",
            key: "all",
            icon: <GlobalOutlined />,
        },
        {
            label: "Ошибки",
            key: "Ошибка",
            icon: <WarningOutlined />,
        },
        {
            label: "Артефакты",
            key: "Артефакт",
            icon: <FileImageOutlined />,
        },
    ]

    function calcEv(v: tableDataType, countEv: countEvaluationType) {
        if (v.evaluation == "TN") {
            countEv.TN++
        } else if (v.evaluation == "TP") {
            countEv.TP++
        }
    }

    function updateVal(item: tableDataType, value: any) {
        const countEv: countEvaluationType = {TP: 0, TN: 0}
        const newList = list.map((v: tableDataType) => {
            calcEv(v, countEv)
            if (v.path == item.path) {
                v.evaluation = value
                return v
            }
            return v
        })
        setList(newList)
        const newData = artifactsData.map((v: tableDataType) => {
            if (v.path == item.path) {
                v.evaluation = value
                return v
            }
            return v
        })
        setArtifactsData(newData)
        setEvaluation(countEv)
    }

    function getInitialList(artifactsD: artefactResponce[], cur: string, curDR: number[]): tableDataType[] {
        const data: tableDataType[] = []
        // console.log(artifactsD,cur, loading, curDR)
        artifactsD.map((val: artefactResponce, ind: number) => {
            // определение типа записи для фильтрации
            let typeArt: typeArtType = !val.content.length ? "all" : "Ошибка"
            for (let contentContent of val.content) {
                if (!isErrorTypeContent(contentContent)) {
                    typeArt = "Артефакт"
                }
            }
            if (typeArt == "Артефакт" && val.content.includes(nameLog)) {
                typeArt = "all"
            }
            //date to seconds для фильтрации + сортировка
            let seconds: number = new Date(val.date).getTime()
            data.push({
                ...val,
                key: ind,
                seconds,
                camera: val.name,
                typeArt,
                evaluation: "no",
            })
        })
        return data
    }

    function getFilteredList(artifactsD: tableDataType[], cur: string, curDR: number[]) {
        const countEv: countEvaluationType = {TP: 0, TN: 0}
        const data: tableDataType[] = []
        if (!artifactsD.length) return
        // console.log(artifactsD,cur, loading, curDR)
        artifactsD.map((val: tableDataType, ind: number) => {
            //фильтрация
            if (
                (cur == "all" || cur == val.typeArt || val.typeArt == "all") &&
                curDR[0] <= val.seconds &&
                val.seconds <= curDR[1]
            ) {
                calcEv(val, countEv)
                data.push(val)
            }
        })
        setList(data)
        setEvaluation(countEv)
    }
    useEffect(() => {
        getFilteredList(artifactsData, current, currentDateRange)
    }, [current, currentDateRange])

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "white",
                    alignItems: "center",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "rgb(240, 240, 240)",
                }}
            >
                <Menu
                    onClick={(e) => {
                        setCurrent(e.key)
                    }}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                ></Menu>
                <DateTimeRangePicker />
            </div>
            <ArtifactsTable
                data={list}
                loading={loading}
                evaluation={evaluation}
                updateVal={updateVal}
                setSeletedKeys={setSeletedKeys}
                filtersOfIncident={getFilterForName(list)}
                footer={
                    <FooterPanel
                        evaluation={evaluation}
                        all={list.length}
                        downloadStatictic={() => downloadStatictic(list)}
                        getSelectedContents={() => console.log(seletedKeys)}
                    />
                }
            />
        </>
    )
}

export default menuTable
