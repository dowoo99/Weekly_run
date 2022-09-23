import { useCallback, useState } from "react";

const useInput = initialData => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback(e => {
    setValue(e.currentTarget.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
