/*
about.tsx
Description: The about page root.
Author: Yu Long
*/
import * as React from "react";
import CHead from "./shared_components/custom_head";
import AboutBody from "./about_components";

export default function HelpPage(): React.ReactNode {
  return (
    <React.Fragment>
      <CHead />
      <AboutBody />
    </React.Fragment>
  );
}
