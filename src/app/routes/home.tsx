import "./home.scss";

import { VNode } from "preact";
import { getAcronyms } from "../../api/acronyms";
import { BandName } from "../components/BandName";
import { Context } from "hono";

export async function loader(c: Context<{ Bindings: Env }>) {
  return { acronyms: await getAcronyms(c) };
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export function Page({ acronyms }: LoaderData): VNode {
  return (
    <>
      <img className="logo" src="/agab.svg" />
      <p>
        A queer joy rebellion playing brass bangers for the theys and gays of
        every generation in Seattle and beyond.
      </p>
      <p>What does AGAB mean? Well, it stands for:</p>
      <BandName acronyms={acronyms} />
      <div className="links">
        <a href="mailto:assignedgayatband@gmail.com">Contact</a>
        <a href="https://forms.gle/vtUepdLQ7rk8YT1t7" target="_blank">
          Interested in Joining?
        </a>
      </div>
    </>
  );
}
