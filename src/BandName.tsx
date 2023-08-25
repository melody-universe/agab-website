import { FunctionComponent, useState } from "react";
import useAsyncImport from "react-use/lib/useAsync.js";
const useAsync = (useAsyncImport as any).default
  ? (useAsyncImport as any).default
  : useAsyncImport;
import useIntervalImport from "react-use/lib/useInterval.js";
const useInterval = (useIntervalImport as any).default
  ? (useIntervalImport as any).default
  : useIntervalImport;

const BandName: FunctionComponent = () => {
  const [name, setName] = useState("Assigned Gay At Band");
  const { loading, value: acronyms } = useAsync(async () => {
    const response = await fetch("/acronyms.txt");
    const body = await response.text();
    return body
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);
  });
  useInterval(
    () => {
      let newName = name;
      while (newName == name) {
        newName = acronyms![Math.floor(Math.random() * acronyms!.length)];
      }
      setName(newName);
    },
    loading ? null : 5000
  );

  return <h1>{name}</h1>;
};
export default BandName;
