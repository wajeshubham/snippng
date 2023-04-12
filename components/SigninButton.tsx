import { useAuth } from "@/context/AuthContext";
import React from "react";
import Button from "./form/Button";
import GoogleIcon from "./icons/GoogleIcon";

const SigninButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <>
      <Button
        className="z-20"
        data-testid="signin-btn"
        onClick={loginWithGoogle}
      >
        <GoogleIcon className="inline-flex mr-2" />
        Sign in/up
      </Button>
    </>
  );
};

export default SigninButton;
