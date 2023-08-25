import BandName from "./BandName";
import { ReactComponent as AgabLogo } from "./assets/agab.svg";

export const Page = () => (
  <>
    <AgabLogo
      title="AGAB"
      preserveAspectRatio="xMidYMid meet"
      style={{
        minHeight: "10em",
        maxHeight: "20em",
        minWidth: "50vw",
        maxWidth: "80vw",
      }}
    />
    <BandName />
    <p>
      <a href="mailto:contact@aga.band">Contact</a>
    </p>
  </>
);
