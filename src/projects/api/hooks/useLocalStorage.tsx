import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => initialValue);

  useEffect(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setState(JSON.parse(savedValue));
    }
  }, [key]);

  const update = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    },
    [key]
  );

  return [state, update];
}
