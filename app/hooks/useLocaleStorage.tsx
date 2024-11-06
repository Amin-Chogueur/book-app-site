import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Function to clear local storage for the specified key
  const clearLocalStorage = () => {
    localStorage.removeItem(key);
    setValue(initialValue); // Reset the state to the initial value
  };

  return [value, setValue, clearLocalStorage] as [
    typeof value,
    typeof setValue,
    typeof clearLocalStorage
  ];
}
