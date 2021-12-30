/*
star.tsx
Description: The star in the background. Decorative component.
Author: Yu Long
*/
import * as React from "react";

export default function Stars(): JSX.Element {
  return (
    <div>
      <img
        className="star1 no-interaction"
        src="images/bkgrd_star.png"
        alt="star decoration 1"
      />
      <img
        className="star2 no-interaction"
        src="images/bkgrd_star.png"
        alt="star decoration 2"
      />
      <img
        className="star3 no-interaction"
        src="images/bkgrd_star.png"
        alt="star decoration 3"
      />
    </div>
  );
}
