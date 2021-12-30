/*
index.tsx
Description: The help page.
Author: Yu Long
*/

import * as React from "react";
import Page from "../shared_components/page";
import HelpEntry from "./HelpEntry";

export default function HelpBody(): JSX.Element {
  return (
    <Page title="Help">
      <HelpEntry />
    </Page>
  );
}
