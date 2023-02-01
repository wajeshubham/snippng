import { Button, Logo, SigninButton, ThemeToggle } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { clsx } from "@/utils";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <header data-testid="header" className="w-full">
      <nav className="w-full h-20 flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-start items-center w-1/2 flex-shrink-0">
          <Link className="inline-flex items-center" href={"/"}>
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
                  className="md:w-5 h-6 md:h-5 w-6 rounded-full object-cover inline-flex md:mr-2 border-[1px] dark:border-white border-zinc-900"
                />
                <span className="md:block hidden">
                  {user.displayName || "Snippng user"}
                </span>
              </Button>
              <Button
                data-testid="logout-btn"
                StartIcon={(props) => (
                  <ArrowLeftOnRectangleIcon
                    {...props}
                    className={clsx(
                      "md:mr-2 md:!w-4 md:!h-4 !w-6 !h-6 mr-0",
                      props.className ?? ""
                    )}
                  />
                )}
                onClick={() => {
                  const confirm = window.confirm(
                    "Are you sure you want to logout?"
                  );
                  if (confirm) {
                    logout();
                  }
                }}
              >
                <span className="md:block hidden">Logout</span>
              </Button>
            </>
          ) : (
            <SigninButton />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
