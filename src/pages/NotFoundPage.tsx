import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate("/page-not-found");
  }, []);

  return (
    <section className="flex justify-center items-center">NotFoundPage</section>
  );
}
