import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  User,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "@/config/firebase";

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
  const [user, setUser] = useState<User | null>(null);

  const loginWithGithub = async () => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth!, provider);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logout = async () => {
    if (!auth) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    await signOut(auth);
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
