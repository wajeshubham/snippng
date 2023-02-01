import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  User,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useToast } from "./ToastContext";

const provider = new GithubAuthProvider();

const AuthContext = createContext<{
  user: User | null;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  loginWithGithub: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addToast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  const loginWithGithub = async () => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    try {
      await signInWithPopup(auth, provider);
      addToast({
        message: "Signed in successfully",
        description: "Hey there!",
      });
    } catch (error) {
      console.log("Error while logging in", error);
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
    <AuthContext.Provider value={{ user, loginWithGithub, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider, AuthContext };
