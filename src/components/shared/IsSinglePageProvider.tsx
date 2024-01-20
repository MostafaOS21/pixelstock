import { useLocation } from "react-router-dom";

export default function IsSinglePageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const pattern = /^(\/photo|\/video)\/(\d+)$/;
  const match = pattern.test(pathname);

  if (!match) return <>{children}</>;
  else return null;
}
