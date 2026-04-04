import "./BandName.scss";

import { ComponentChild } from "preact";
import { useSignal, useSignalEffect } from "@preact/signals";

export function BandName({ acronyms }: BandNameProps): ComponentChild {
  const { name, next } = useController(acronyms);

  return (
    <h1 className="band-name" onClick={next}>
      {name}
    </h1>
  );
}

type BandNameProps = { acronyms: string[] };

function useController(acronyms: string[]): Controller {
  const name = useSignal(initialName);

  const next = useSignal(() => {
    name.value = getNext();
  });

  useSignalEffect(() => {
    const next = getNext();

    const timeout = setTimeout(() => {
      name.value = next;
    }, 5000);

    return () => clearTimeout(timeout);
  });

  return { next: next.value, name: name.value };

  function getNext(): string {
    let next = name.value;

    while (next === name.value) {
      next = acronyms[Math.floor(Math.random() * acronyms.length)];
    }

    return next;
  }
}

type Controller = { next(): void; name: string };

const initialName = "Assigned Gay At Band";
