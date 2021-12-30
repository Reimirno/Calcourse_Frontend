/*
custom_head.tsx
Description: The general header component.
Author: Yu Long
*/
import Head from "next/head";

export default function CHead(): JSX.Element {
  return (
    <Head>
      <title>CalCourses</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="/css/google_font.css" rel="stylesheet" />
    </Head>
  );
}
