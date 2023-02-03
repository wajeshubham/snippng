import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  User,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useToast } from "./ToastContext";
import Layout from "@/layout/Layout";
import { Loader } from "@/components";

const GithubProvider = new GithubAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

const AuthContext = createContext<{
  user: User | null;
  /**
   * Using mobile browsers in NON-incognito mode with **github authentication** results in the `missing initial state` error.
   *
   * This issue is still unresolved from the firebase side.
   *
   * FIREBASE ISSUE: https://github.com/firebase/firebase-js-sdk/issues/4256
   *
   * @deprecated
   */
  loginWithGithub: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  loginWithGithub: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addToast } = useToast();
  const [signingIn, setSigningIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Using mobile browsers in NON-incognito mode with **github authentication** results in the `missing initial state` error.
   *
   * This issue is still unresolved from the firebase side.
   *
   * FIREBASE ISSUE: https://github.com/firebase/firebase-js-sdk/issues/4256
   *
   * @deprecated
   */
  const loginWithGithub = async () => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    try {
      await signInWithPopup(auth, GithubProvider);
      addToast({
        message: "Signed in successfully",
        description: "Hey there!",
      });
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };

  const loginWithGoogle = async () => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    setSigningIn(true);
    try {
      await signInWithPopup(auth, GoogleProvider);
      addToast({
        message: "Signed in successfully",
        description: "Hey there!",
      });
    } catch (error) {
      console.log("Error while logging in", error);
      addToast({
        message: "Error occurred while signing in!",
        type: "error",
      });
    } finally {
      setSigningIn(false);
    }
  };

  const logout = async () => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    await signOut(auth);
    addToast({
      message: "Logged out successfully",
      description: "See you again!",
    });
  };

  useEffect(() => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginWithGithub, loginWithGoogle, logout }}
    >
      {signingIn ? (
        <Layout>
          <Loader />
        </Layout>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider, AuthContext };
