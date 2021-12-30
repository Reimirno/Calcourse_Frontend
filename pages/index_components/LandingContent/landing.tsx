import * as React from "react";

const title = "Plan Your Next Semester";
const subtitle = "@ Berkeley";
const description =
  "We are here to help you create a personal course plan based on your major and academic interests.";

export default function Landing(): JSX.Element {
  return (
    <div className="landing-content">
      <h2 className="mainText no-interaction">{title}</h2>
      <h3 className="subText no-interaction">{subtitle}</h3>
    </div>
  );
}
