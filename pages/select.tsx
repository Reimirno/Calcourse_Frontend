/*
select.tsx
Description: The selection page root.
Author: Yu Long
*/
import * as React from "react";
import CHead from "./shared_components/custom_head";
import SelectBody from "./select_components/SelectContent";

export default function SelectCourses(): React.ReactNode {
  return (
    <React.Fragment>
      <CHead />
      <SelectBody />
    </React.Fragment>
  );
}
