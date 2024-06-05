import { lineSpinner } from "ldrs";

export default function Loader({ ...props }) {
  lineSpinner.register();
  return <l-line-spinner {...props}></l-line-spinner>;
}
