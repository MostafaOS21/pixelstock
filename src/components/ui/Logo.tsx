import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <h1 className="h1-bold text-primary dark:text-primary-100">
      <Link to={"/"}>PixelStock</Link>
    </h1>
  );
}
