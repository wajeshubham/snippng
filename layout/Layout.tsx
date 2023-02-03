import { clsx } from "@/utils";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = ({
  title = "Snippng | code snippets to image",
  description = "Write, customize and download gorgeous images of your code snippet.",
  className,
  ...props
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Header />
      <div
        className={clsx(
          "relative max-w-7xl min-h-screen mx-auto px-4 sm:px-8 lg:px-12 pb-6",
          className ?? ""
        )}
        {...props}
      >
        {props.children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
