import { AuthProvider } from "@/context/AuthContext";
import { SnippngContextProvider } from "@/context/SnippngEditorContext";
import { ToastProvider } from "@/context/ToastContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ToastProvider>
        <AuthProvider>
          <SnippngContextProvider>
            <Component {...pageProps} />
          </SnippngContextProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
