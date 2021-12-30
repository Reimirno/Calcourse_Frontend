/*
page.tsx
Description: The page component. Use this whenever creating a new page to keep the style consistent.
Author: Yu Long
*/
import * as React from "react";

interface PageProps {
  title: string;
  children: React.ReactNode;
}
export default function Page(props: PageProps): JSX.Element {
  return (
    <div className="horizontal-fitter">
      <div className="page-container">
        <h2 className="page-title no-interaction">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}
