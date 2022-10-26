import { useEffect, useState, useCallback } from "react";
import { getRandomFact } from "../services/api";

export const useCatFacts = () => {
  const [fact, setFact] = useState("");
  const [busy, setBusy] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setBusy(true);
    getRandomFact().then((response) => {
      setFact(response.fact);
      setBusy(false);
    });
  }, []);

  const handleNext = useCallback(() => {
    setBusy(true);
    getRandomFact().then((response) => {
      setRecent((prev) => [fact, ...prev].slice(0, 5));
      setFact(response.fact);
      setBusy(false);
    });
  }, [fact]);

  return {
    fact,
    busy,
    recent,
    handleNext
  };
};
