import { AuthProvider } from "@/context/AuthContext";
import { SnippngContextProvider } from "@/context/SnippngEditorContext";
import { ToastProvider } from "@/context/ToastContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <AuthProvider>
        <SnippngContextProvider>
          <Component {...pageProps} />
        </SnippngContextProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
