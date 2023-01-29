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
  title = "Snippng | snippets to png",
  description = " Create and share beautiful images of your source code.",
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

        <meta
          property="og:image"
          content="https://wajeshubham-portfolio.s3.ap-south-1.amazonaws.com/snippng-cover.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://snippng.wajeshubham.in" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://wajeshubham-portfolio.s3.ap-south-1.amazonaws.com/snippng-cover.png"
        />
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
