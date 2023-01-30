import { Button, Logo, ThemeToggle } from "@/components";
import GithubIcon from "@/components/icons/GithubIcon";
import { useAuth } from "@/context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { loginWithGithub, user, logout } = useAuth();
  return (
    <header data-testid="header" className="w-full">
      <nav className="w-full h-20 flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-start items-center w-1/2 flex-shrink-0">
          <Logo />
        </div>
        <div className="flex justify-end gap-4 items-center w-1/2 flex-shrink-0">
          <ThemeToggle />
          {user?.uid ? (
            <Button onClick={logout}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.photoURL || ""}
                alt="profile_image"
                className="h-6 w-6 rounded-full object-cover inline-flex mr-2"
              />
              {user.displayName}
            </Button>
          ) : (
            <Button onClick={loginWithGithub}>
              <GithubIcon className="inline-flex mr-1" />
              Signin
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
