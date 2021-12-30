/*
index.tsx
Description: The landing page.
Author: Yu Long
*/
import * as React from "react";
import Landing from "./landing";
import StartButton from "./start_button";

export default function LandingBody(): JSX.Element {
  return (
    <div className="body">
      <Landing />
      <StartButton />
    </div>
  );
}
