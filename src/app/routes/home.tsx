import styles from "./home.module.scss";

import { VNode } from "preact";
import { getAcronyms } from "../../api/acronyms";
import { BandName } from "../components/BandName";
import { Context } from "hono";
import { Spinner } from "../components/Spinner";
import { useSignal, useSignalEffect } from "@preact/signals";
import { hc } from "hono/client";
import { Api } from "../../api";
import { noPreloadedData, NoPreloadedData } from "../../route";

export const path = "/";

export async function loader(c: Context<{ Bindings: Env }>) {
  return { acronyms: await getAcronyms(c) };
}

type LoaderData = Partial<Awaited<ReturnType<typeof loader>>>;

export function Page({
  data = noPreloadedData,
}: {
  data: LoaderData | NoPreloadedData;
}): VNode {
  const controller = useController(data);

  if (controller.kind === "loading") {
    return <Spinner />;
  }

  const { acronyms } = controller;

  return (
    <div className={styles.container}>
      <img className={styles.logo} src="/agab.svg" />
      <p className={styles.paragraph}>
        A queer joy rebellion playing brass bangers for the theys and gays of
        every generation in Seattle and beyond.
      </p>
      <p className={styles.paragraph}>
        What does AGAB mean? Well, it stands for:
      </p>
      <BandName initialValue={acronyms.initial} acronyms={acronyms.all} />
      <div>
        <a
          className={styles.callToAction}
          href="mailto:assignedgayatband@gmail.com"
        >
          Contact
        </a>
        <a
          className={styles.callToAction}
          href="https://forms.gle/vtUepdLQ7rk8YT1t7"
          target="_blank"
        >
          Interested in Joining?
        </a>
      </div>
    </div>
  );
}

function useController(data: LoaderData | NoPreloadedData): Controller {
  const acronyms = useSignal(data === noPreloadedData ? null : data.acronyms);

  useSignalEffect(() => {
    if (acronyms.value === null) {
      (async () => {
        const api = hc<Api>("/api");
        const result = await api.acronyms.$get();
        acronyms.value = await result.json();
      })();
    }
  });

  return acronyms.value
    ? { kind: "ready", acronyms: acronyms.value }
    : { kind: "loading" };
}

type Controller =
  | ({ kind: "ready" } & Required<LoaderData>)
  | { kind: "loading" };
