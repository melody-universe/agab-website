import BandName from "./BandName";
import { ReactComponent as BoldLogo } from "./assets/agab.svg";
import { ReactComponent as LazyDogLogo } from "./assets/agab-alt.svg";
import { ComponentProps, useCallback, useState } from "react";

export const Page = () => {
  const [alt, setAlt] = useState(false);
  const toggleAlt = useCallback(() => setAlt(!alt), [alt]);
  const bannerProps: SvgProps = {
    onClick: toggleAlt,
    preserveAspectRatio: "xMidYMid meet",
    style: {
      cursor: "pointer",
      minHeight: "10em",
      maxHeight: "20em",
      minWidth: "50vw",
      maxWidth: "80vw",
      userSelect: "none",
    },
    title: "AGAB",
  };

  return (
    <>
      {alt ? <LazyDogLogo {...bannerProps} /> : <BoldLogo {...bannerProps} />}
      <BandName />
      <p>
        <a href="mailto:contact@aga.band">Contact</a>
      </p>
    </>
  );
};

type SvgProps = ComponentProps<"svg"> & { title?: string };
