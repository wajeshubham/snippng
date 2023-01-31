import { useAuth } from "@/context/AuthContext";
import React from "react";
import Button from "./form/Button";
import GithubIcon from "./icons/GithubIcon";

const SigninButton = () => {
  const { loginWithGithub } = useAuth();

  return (
    <Button onClick={loginWithGithub}>
      <GithubIcon className="inline-flex mr-1" />
      Signin
    </Button>
  );
};

export default SigninButton;
