import { ThemeToggle } from "@/components";
import { CommandLineIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header data-testid="header" className="w-full">
      <nav className="w-full h-20 flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-start items-center w-1/2 flex-shrink-0">
          <h1 className="relative dark:text-white text-zinc-900 inline-flex items-center text-2xl">
            <CommandLineIcon className="inset-0 h-7 w-7 mr-2" />
            <span className="">Snippng</span>
          </h1>
        </div>
        <div className="flex justify-end items-center w-1/2 flex-shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
