/*
help.tsx
Description: The help page root.
Author: Yu Long
*/
import * as React from "react";
import CHead from "./shared_components/custom_head";
import HelpBody from "./help_components";

export default function HelpPage(): React.ReactNode {
  return (
    <React.Fragment>
      <CHead />
      <HelpBody />
    </React.Fragment>
  );
}
