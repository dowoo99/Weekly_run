import React, { useState, useEffect } from "react";

const useQueryDebounce = (value, delay) => {
  const [debounceValue, setDevounceValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDevounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useQueryDebounce;
