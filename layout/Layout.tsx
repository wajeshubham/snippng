import { clsx } from "@/utils";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ className, ...props }) => {
  return (
    <>
      <Header />
      <div
        className={clsx(
          "relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6",
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
