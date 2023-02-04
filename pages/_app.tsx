import { analytics } from "@/config/firebase";
import { AuthProvider } from "@/context/AuthContext";
import { SnippngContextProvider } from "@/context/SnippngEditorContext";
import { ToastProvider } from "@/context/ToastContext";
import "@/styles/globals.css";
import { logEvent } from "firebase/analytics";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (analytics && process.env.NODE_ENV === "production") {
      const _logEvent = (path: string) => {
        if (!analytics) return;
        logEvent(analytics, "page_view", {
          screen_name: path,
        });
      };
      router.events.on("routeChangeComplete", (path) => {
        _logEvent(path);
      });

      _logEvent(window.location.pathname);
      return () => {
        router.events.off("routeChangeComplete", _logEvent);
      };
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          // content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          content="width=1024, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover" // for default desktop view in mobile browsers
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
