import { useEffect, useState, useCallback } from "react";
import { getRandomActivity } from "../services/api";

export const useActivity = () => {
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setBusy(true);
    getRandomActivity().then((response) => {
        setActivity(`${response.type.toUpperCase()}: ${response.activity}.`);
        setType(response.type);
        setBusy(false);
    });
  }, []);

  const handleNext = useCallback(() => {
    setBusy(true);
    getRandomActivity().then((response) => {
      setActivity(`${response.type.toUpperCase()}: ${response.activity}.`);
      setType(response.type);
      setBusy(false);
    });
    
  }, [activity]);

  return {
    type: type,
    activity: activity,
    busyAct: busy,
    handleNextAct: handleNext
  };
};
