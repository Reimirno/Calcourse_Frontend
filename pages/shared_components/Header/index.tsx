/*
index.tsx
Description: The navigation bar component.
Author: Yu Long
*/
import Title from "./title";
import NavBar from "./navbar";

export default function Header(): JSX.Element {
  return (
    <header className="navbar-master no-interaction">
      <Title />
      <NavBar />
    </header>
  );
}
