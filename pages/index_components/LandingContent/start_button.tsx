import * as React from "react";
import Link from "next/link";

export default function StartButton(): JSX.Element {
  return (
    <Link href="/select">
      <div className="btn startbtn">
        <p>START</p>
      </div>
    </Link>
  );
}
