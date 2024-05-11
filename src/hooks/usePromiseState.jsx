import { useState } from "react";

const usePromiseState = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const updateWithPromise = async (newValue) => {
    setValue(newValue);
    console.log(newValue);
    return new Promise((resolve) => setTimeout(resolve, 0));
  };

  return [value, updateWithPromise];
};

export default usePromiseState;
