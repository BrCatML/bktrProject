import React, {useEffect, useState} from "react"
import {artefactResponce, countEvaluationType, tableDataType, typeArtType, filtertype} from "./types"
import ArtifactsTable from "./artifactsTable"
import FileImageOutlined from "@ant-design/icons/FileImageOutlined"
import WarningOutlined from "@ant-design/icons/WarningOutlined"
import GlobalOutlined from "@ant-design/icons/GlobalOutlined"
import Menu, {MenuProps} from "antd/es/menu"
import DatePicker from "antd/es/date-picker"
import moment from "moment"
import message from 'antd/es/message'
import FooterPanel from "./footerPanel"
import DateTimeRangePicker from "./dateTimeRangePicker"

// // @ts-ignore
// import yaml from "js-yaml"
// // @ts-ignore
// import {saveAs} from "file-saver"
import initData from './static/testData'
import './index.css'

const {RangePicker} = DatePicker

export const nameLog: string = "errors.log"
export function isErrorTypeContent(typeCont: string): boolean {
    return typeCont == nameLog ? true : false
}

async function getData () {
    const ff : artefactResponce[] = initData
    return ff
}

export function getFilterForName(list?: tableDataType[]): filtertype[] | undefined {
    if (!list || !list.length || !list[0]["name"]) return
    let filteredItems = [...new Set(list[0]["name"] ? list.map((value: tableDataType) => value["name"]) : undefined)]
    const filterItems: filtertype[] = filteredItems.map((val: string) => {
        return {
            text: val,
            value: val,
        }
    })
    return filterItems
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

async function apiArtifacts() {
    const gotData: artefactResponce[] = await getData()  // await fetch("/api/artifacts/")
        .then((res) => res) //res.json())
        // .catch(console.error)
    gotData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const initialCurrentDateRange = [
        new Date(gotData[0].date).getTime(),
        new Date(gotData[gotData.length - 1].date).getTime(),
    ]
    return {
        defaultDateRange: [moment(new Date(gotData[0].date)), moment(new Date(gotData[gotData.length - 1].date))] as [
            moment.Moment,
            moment.Moment,
        ],
        currentDateRange: initialCurrentDateRange,
        artifactsData: gotData,
    }
}

function getInitialList(artifactsD: artefactResponce[]): tableDataType[] {
    const data: tableDataType[] = []
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

function calcEv(v: tableDataType, countEv: countEvaluationType) {
    if (v.evaluation == "TN") {
        countEv.TN++
    } else if (v.evaluation == "TP") {
        countEv.TP++
    }
}

function getFilteredList(artifactsD: tableDataType[], cur: string, curDR: number[]) {
    const countEv: countEvaluationType = {TP: 0, TN: 0}
    const data: tableDataType[] = []
    if (artifactsD.length) {
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
    }
    return {list: data, evaluation: countEv}
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

function menuTable() {
    const [artifactsData, setArtifactsData] = useState<tableDataType[]>([]) //данные без фильтрации
    const [loading, setLoading] = useState<boolean>(true)
    const [currentMenu, setCurrentMenu] = useState("all")
    const [defaultDateRange, setDefaultDateRange] = useState<[moment.Moment, moment.Moment]>([moment(), moment()])
    const [currentDateRange, setCurrentDateRange] = useState<number[]>([0, 0])
    const [list, setList] = useState<tableDataType[]>([]) //данные после фильтрации
    const [evaluation, setEvaluation] = useState<countEvaluationType>({TP: 0, TN: 0})
    const [seletedKeys, setSeletedKeys] = useState<React.Key[]>([])

    useEffect(() => {
        apiArtifacts()
            .then((response) => {
                setDefaultDateRange(response.defaultDateRange)
                setCurrentDateRange(response.currentDateRange)
                setArtifactsData(getInitialList(response.artifactsData))
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        const newData = getFilteredList(artifactsData, currentMenu, currentDateRange)
        setList(newData.list)
        setEvaluation(newData.evaluation)
    }, [artifactsData, currentMenu, currentDateRange])

    const onChange = (dates: number[]) => {
        dates && dates[0] && dates[1] ? setCurrentDateRange([dates[0], dates[1]]) : setCurrentDateRange([0, 0])
    }

    function updateVal(item: tableDataType, value: string) {
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

    return (
        <>
            <div className="artifactTableMenu">
                <Menu
                    onClick={(e) => {
                        setCurrentMenu(e.key)
                    }}
                    selectedKeys={[currentMenu]}
                    mode="horizontal"
                    items={items}
                />
                <DateTimeRangePicker
                    defaultDateRange={defaultDateRange}
                    currentDateRange={currentDateRange}
                    onChange={onChange}
                    loading={loading}
                />
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
