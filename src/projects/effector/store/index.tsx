import React from "react"
import { createEffect, createEvent, createStore} from "effector"
// import { useEvent, useStore } from "effector-react"


export const counterEvent = createEvent()
export const counterStore = createStore(0)
    .on(counterEvent,(newStore: number ) => {
        return newStore + 1
    })

export const stringCounterEvent = createEvent()
export const stringCounterStore = createStore('0')
    .on(stringCounterEvent,(newStore: string ) => {
        // counterEvent()
        const vv = counterStore.getState()
        return newStore + vv
    })

export interface ActivityResponse {
        activity: string;
        accessibility: number;
        type: string;
        participants: number;
        price: number;
        link: string;
        key: number;
}
      
// export const url = "http://www.boredapi.com/api/activity/"
export const fetchApiFx = createEffect((url: string = "http://www.boredapi.com/api/activity/") => fetch(url).then(req => req.json()) )


export const actStore = createStore<{current: ActivityResponse | null, history: ActivityResponse[]}>({current: null, history: []})
    .on(fetchApiFx.doneData, (state, result: ActivityResponse) => {
        const history: ActivityResponse[] = state && state.current ?  [state.current].concat(state.history).slice(0,10) : []
        return ({current: result, history})
    })

interface FactResponse {
    fact: string;
    length: number;
}

export const fetchApiFxCat = createEffect((url: string = "https://catfact.ninja/fact") => fetch(url).then(req => req.json()) )

export const factStore = createStore<{current: FactResponse | null, history: FactResponse[]}>({current: null, history: []})
    .on(fetchApiFxCat.doneData, (state, result: FactResponse) => {
        const history: FactResponse[] = state && state.current ?  [state.current].concat(state.history).slice(0,10) : []
        return ({current: result, history})
    })

// не работает как надо. проблема в том, что компонент не реагирует на изменение содержимого store, которое указано в свойствах
export const onOpenEvent = createEvent()
export const onOpenEffect = createEffect()
export const isOpenStore = createStore(false)
    .on(onOpenEvent, (state) => {
        console.log(state,'->',!state)
        return !state}) 
    .on(onOpenEffect.done, (state) => !state)

