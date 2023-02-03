import { useAuth } from "@/context/AuthContext";
import React from "react";
import Button from "./form/Button";
import GoogleIcon from "./icons/GoogleIcon";

const SigninButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <>
      <Button data-testid="signin-btn" onClick={loginWithGoogle}>
        <GoogleIcon className="inline-flex mr-2" />
        Signin
      </Button>
    </>
  );
};

export default SigninButton;
