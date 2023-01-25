import { ThemeToggle } from "@/components";

const Header = () => {
  return (
    <header
      data-testid="header"
      className="w-full border-b-[0.1px] dark:border-zinc-200 border-zinc-300"
    >
      <nav className="w-full h-16 flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-start items-center w-1/2 flex-shrink-0">
          <h1 className="dark:text-white text-zinc-900">Snippng</h1>
        </div>
        <div className="flex justify-end items-center w-1/2 flex-shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
