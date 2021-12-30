/*
index.tsx
Description: The landing page root.
Author: Yu Long
*/
import * as React from "react";
import CHead from "./shared_components/custom_head";
import LandingBody from "./index_components/LandingContent";

export default function Home(): React.ReactNode {
  return (
    <React.Fragment>
      <CHead />
      <LandingBody />
    </React.Fragment>
  );
}
