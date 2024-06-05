import React, { useEffect } from "react";

export default function Loader({ ...props }) {
  useEffect(() => {
    async function getLoader() {
      const { lineSpinner } = await import("ldrs");
      lineSpinner.register();
    }
    getLoader();
  }, []);
  return <l-line-spinner {...props}></l-line-spinner>;
}
