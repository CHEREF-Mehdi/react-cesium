import * as React from "react";
import { CesiumWidget } from "resium";

interface GlobeProps {}

export const Globe: React.FC<GlobeProps> = () => {
  return <CesiumWidget></CesiumWidget>;
};
