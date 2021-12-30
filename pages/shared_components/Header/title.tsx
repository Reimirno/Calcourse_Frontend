import Link from "next/link";

export default function Title() {
  return (
    <Link href="/" passHref>
      <div>
        <div className="logoContainer">
          <img src="/images/calcourses_logo.png" alt="logo" className="logo" />
          <h1 className="logo">CalCourses</h1>
        </div>
      </div>
    </Link>
  );
}
