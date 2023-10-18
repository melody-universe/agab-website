import BandName from "./BandName";
import { ReactComponent as Logo } from "./assets/agab.svg";

export const Page = () => (
  <>
    <Logo
      preserveAspectRatio="xMidYMid meet"
      style={{
        minHeight: "10em",
        maxHeight: "16em",
        minWidth: "50vw",
        maxWidth: "80vw",
      }}
      title="AGAB"
    />
    <p>
      A queer joy rebellion playing brass bangers for the theys and gays of
      every generation in Seattle and beyond.
    </p>
    <p>What does AGAB mean? Well, it stands for:</p>
    <BandName />
    <p>
      <a href="mailto:contact@aga.band">Contact</a>
    </p>
  </>
);
