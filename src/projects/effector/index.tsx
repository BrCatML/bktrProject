import React, { useEffect } from "react";
// //@ts-ignore
// import Logo from '../../static/logo_100.png'

// export default () => {

//   return (
//     <div className="index-style ">
//     <div style={{margin: 'auto'}}>
//         <img src={Logo} height={100} width={100} alt="bktr" />
//         <h1>R E D U X</h1>
//     </div>
//     </div>
//   )
// }

import { useEvent, useStore } from "effector-react";
import {fetchApiFx,actStore,fetchApiFxCat,factStore} from './store'

const url = "http://www.boredapi.com/api/activity/"
const urlFact = "https://catfact.ninja/fact"

export default function App() {

    const styleBlock: React.CSSProperties = {borderStyle: "solid", borderColor: 'gray' , margin: '10px', padding: '15px', color: 'black', width: '600px'}

    const textActStore = useStore(actStore)
    const pending = useStore(fetchApiFx.pending)
    const fetchEvent = useEvent(fetchApiFx)

    const textFactStore = useStore(factStore)
    const pendingFact = useStore(fetchApiFxCat.pending)
    const fetchFactEvent = useEvent(fetchApiFxCat)

    useEffect(window.onload = () => {
        if (textActStore.current == null) fetchEvent(url)
        if (textFactStore.current == null) fetchFactEvent(urlFact)
    },[])

    return (
        <div className="index-style ">
            <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                <div style={styleBlock}>
                    <h2>Facts</h2>
                    <p>{textFactStore?.current?.fact}</p>
                    <button disabled={pendingFact} onClick={() => fetchFactEvent(urlFact)}>update</button>
                </div>
                <div style={styleBlock}>
                    <h2>Activities</h2>
                    <p>{textActStore?.current?.activity}</p>
                    <button disabled={pending} onClick={() => fetchEvent(url)}>update</button>
                </div>
                <div style={styleBlock}>
                    <details style={{textAlign: 'start', backgroundColor: 'white', padding: '10px'}}>
                        <summary>История</summary>
                        {textActStore?.history.length
                        ? textActStore.history.map((e,i) => (
                            <p key={i}>{e.activity}</p>
                        ))
                        : <p>пусто</p>
                        }
                    </details>
                </div>
            </div>
        </div>
    )
}






// function App2() {
//     const [open, setOpen] = useLocalStorage("catfacts:open-history", false);
//     const { busy, fact, handleNext, recent } = useCatFacts();
//     const { busyAct, activity, type, handleNextAct} = useActivity();

//     const handleToggle = useCallback(
//         (newOpen) => {
//             setOpen(newOpen);
//         },
//         [setOpen]
//     );

//     return (
//         <div className="api-style ">
//             <h1>Api test</h1>
//             <div className="api-content">
//                 <CatFact busy={busy} fact={fact} onClickNext={handleNext} />
//                 <Divider />
//                 <RecentFacts onToggle={handleToggle} open={open} facts={recent} />
//                 <Divider />
//                 <Activity busy={busyAct} type={type} activity={activity} onClickNext={handleNextAct} />
//             </div>
//         </div>
//     );
// // }
// export default App()