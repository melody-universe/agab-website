import "./BandName.scss";

import { ComponentChild } from "preact";
import { useSignal, useSignalEffect } from "@preact/signals";

export function BandName({ acronyms }: BandNameProps): ComponentChild {
  const { name, next } = useController(acronyms[0], acronyms);

  return (
    <h1 className="band-name" onClick={next}>
      {name}
    </h1>
  );
}

type BandNameProps = { acronyms: string[] };

function useController(initialAcronym: string, acronyms: string[]): Controller {
  const name = useSignal(initialAcronym);

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
    const remaining = acronyms.filter((_) => _ !== name.value);

    if (remaining.length === 0) {
      return name.value;
    }

    return remaining[Math.floor(Math.random() * remaining.length)];
  }
}

type Controller = { next(): void; name: string };
