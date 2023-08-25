import { FunctionComponent, useState } from "react";
import { useAsync, useInterval } from "react-use";

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
