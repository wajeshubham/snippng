import { ThemeToggle } from "@/components";
import Logo from "@/components/Logo";
import { CommandLineIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header data-testid="header" className="w-full">
      <nav className="w-full h-20 flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-start items-center w-1/2 flex-shrink-0">
          <Logo />
        </div>
        <div className="flex justify-end items-center w-1/2 flex-shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
