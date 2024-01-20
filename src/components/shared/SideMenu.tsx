import NavItems from "./NavItems";

export default function SideMenu() {
  return (
    <aside className={`hidden lg:block bg-[#fafafa] dark:bg-dark`}>
      <nav className="flex flex-col p-4 gap-2 fixed z-[1000] w-[300px] bg-[#fafafa] dark:bg-dark  top-0 h-screen  ">
        <NavItems />
      </nav>
    </aside>
  );
}
