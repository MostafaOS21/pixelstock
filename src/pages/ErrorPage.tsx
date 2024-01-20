import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ErrorPage({ message }: { message: string }) {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <h1 className="font-light text-5xl md:text-8xl">OOOOOPS!</h1>
      <p className="-mt-6 bg-white-PURE dark:bg-dark-100 text-xl tracking-wider px-3">
        {message}
      </p>

      <Button className="mt-8 btn">
        <Link to={"/"}>Go to homepage</Link>
      </Button>
    </div>
  );
}
