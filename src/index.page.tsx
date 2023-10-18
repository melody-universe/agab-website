import BandName from "./BandName";
import Button from "./Button";
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
    <div>
      <Button href="mailto:contact@aga.band">Contact</Button>
      <Button href="https://forms.gle/vtUepdLQ7rk8YT1t7" target="_blank">
        Interested in Joining?
      </Button>
    </div>
  </>
);
