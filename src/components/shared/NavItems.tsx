import { sideMenuLinks } from "@/constants";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";

export default function NavItems() {
  const location = useLocation();

  // Manage Active Links
  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (document.querySelector(".bg-yellow")) {
      document.querySelector(".bg-yellow")?.classList.remove("bg-yellow");
    }

    e.currentTarget.classList.add("bg-yellow");
  };

  return (
    <>
      <div className="px-5 py-4">
        <Logo />
      </div>
      {sideMenuLinks.map((link) => {
        let isActive = location.pathname === link.route;

        return (
          <Button
            variant={"ghost"}
            className={`rounded-full hover:bg-white-50 dark:hover:bg-yellow-900 text-base font-normal !p-0 h-fit ${
              isActive &&
              "bg-yellow hover:bg-yellow dark:bg-yellow-900 dark:text-yellow-500"
            }`}
            size={"lg"}
            asChild
            onClick={handleLinkClick}
            key={link.route}
          >
            <button className="relative overflow-hidden">
              <Link
                to={link.route}
                className="flex items-center !justify-start gap-3 w-full w-h-full py-3 px-5"
              >
                {isActive ? link.ActiveIcon : link.NotActiveIcon} {link.name}
              </Link>
            </button>
          </Button>
        );
      })}
    </>
  );
}
