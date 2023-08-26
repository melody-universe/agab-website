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
  const [delay, setDelay] = useState<number | null>(null);
  const { value: acronyms } = useAsync(async () => {
    const response = await fetch("/acronyms.txt");
    const body = await response.text();
    setDelay(5000);
    return body
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);
  });
  useInterval(selectNewName, delay);

  return (
    <h1
      onClick={() => {
        selectNewName();
        setDelay(null);
        setTimeout(() => setDelay(5000), 100);
      }}
    >
      {name}
    </h1>
  );

  function selectNewName() {
    let newName = name;
    while (newName == name) {
      newName = acronyms![Math.floor(Math.random() * acronyms!.length)];
    }
    setName(newName);
  }
};
export default BandName;
