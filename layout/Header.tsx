import { Button, Logo, ThemeToggle } from "@/components";
import GithubIcon from "@/components/icons/GithubIcon";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { loginWithGithub, user, logout } = useAuth();
  const router = useRouter();
  return (
    <header data-testid="header" className="w-full">
      <nav className="w-full h-20 flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-start items-center w-1/2 flex-shrink-0">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="flex justify-end gap-4 items-center w-1/2 flex-shrink-0">
          <ThemeToggle />
          {user?.uid ? (
            <>
              <Button
                onClick={() => {
                  router.push(`/profile`);
                }}
              >
                <img
                  src={user.photoURL || ""}
                  alt="profile_image"
                  className="h-5 w-5 rounded-full object-cover inline-flex mr-2"
                />
                {user.displayName}
              </Button>
              <Button StartIcon={ArrowLeftOnRectangleIcon} onClick={logout}>
                Logout
              </Button>
            </>
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
