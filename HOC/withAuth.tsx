import { SigninButton } from "@/components";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import { ComponentType } from "react";

/**
 * @function withAuth (HOC)
 * @description Handles the authentication logic and returns the wrapped `Component` if the user is `authenticated` else renders signin button
 */
const withAuth = <T extends Object>(Component: ComponentType<T>) => {
  const InnerComponent = (props: T) => {
    const { user } = useAuth();

    if (!user)
      return (
        <Layout title={`Snippng | code snippets to image`}>
          <div
            data-testid="signin-btn-container"
            className="w-full h-full flex justify-center items-center py-32"
          >
            <SigninButton />
          </div>
        </Layout>
      );

    return <Component {...props} />;
  };
  return InnerComponent;
};

export default withAuth;
