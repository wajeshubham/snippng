import { SnippngContextProvider } from "@/context/SnippngEditorContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnippngContextProvider>
      <Component {...pageProps} />;
    </SnippngContextProvider>
  );
}
