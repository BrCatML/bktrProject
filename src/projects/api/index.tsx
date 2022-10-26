import React from "react";
import { useCallback } from "react";
import { CatFact } from "./components/CatFact";
import { useCatFacts } from "./hooks/useCatFacts";
import { RecentFacts } from "./components/RecentFacts";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { Activity } from "./components/Activity";
import { useActivity } from "./hooks/useActivity";
import Divider from "antd/es/divider"


export default function App() {
    const [open, setOpen] = useLocalStorage("catfacts:open-history", false);
    const { busy, fact, handleNext, recent } = useCatFacts();
    const { busyAct, activity, type, handleNextAct} = useActivity();

    const handleToggle = useCallback(
        (newOpen) => {
            setOpen(newOpen);
        },
        [setOpen]
    );

    return (
        <div className="api-style ">
            <h1>Api test</h1>
            <div className="api-content">
                <CatFact busy={busy} fact={fact} onClickNext={handleNext} />
                <Divider />
                <RecentFacts onToggle={handleToggle} open={open} facts={recent} />
                <Divider />
                <Activity busy={busyAct} type={type} activity={activity} onClickNext={handleNextAct} />
            </div>
        </div>
    );
}
