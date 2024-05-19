import { useState } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const parsedValue: T = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState<T>(parsedValue);

  const updateValue: SetValue<T> = (newValue) => {
    const finalValue =
      newValue instanceof Function ? newValue(value) : newValue;
    localStorage.setItem(key, JSON.stringify(finalValue));
    setValue(finalValue);
  };

  return [value, updateValue];
}
