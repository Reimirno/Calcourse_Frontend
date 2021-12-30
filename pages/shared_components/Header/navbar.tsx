import NavLink from "next/link";
import Link from "next/link";

export default function Title(): JSX.Element {
  return (
    <ul className="navbar-container">
      <li className="hover-underline-animation">
        <Link href="select">Plan</Link>
      </li>
      <li className="hover-underline-animation">
        <Link href="help">F&#38;Q</Link>
      </li>
      <li className="hover-underline-animation">
        <Link href="about">About</Link>
      </li>
      <li className="hover-underline-animation">
        <Link href="#">Login</Link>
      </li>
    </ul>
  );
}
