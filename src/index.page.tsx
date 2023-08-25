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
    <h1>Assigned Gay At Band</h1>
    <a href="mailto:contact@aga.band">Contact</a>
  </>
);
