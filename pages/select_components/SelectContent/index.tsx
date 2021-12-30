import * as React from "react";
import SelectForm from "./SelectForm";
import Page from "../../shared_components/page";

export default function SelectBody(): JSX.Element {
  return (
    <Page title="Plan">
      <SelectForm />
    </Page>
  );
}
