import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CgMenuLeftAlt } from "react-icons/cg";
import NavItems from "./NavItems";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <CgMenuLeftAlt className="text-lg" />
      </SheetTrigger>
      <SheetContent className="z-[1001] flex flex-col" side={"left"}>
        <NavItems />
      </SheetContent>
    </Sheet>
  );
}
