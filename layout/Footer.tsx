import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t-[0.1px] dark:border-zinc-200 border-zinc-300 bg-white dark:bg-black">
      <div className="w-full h-16 gap-4 text-xs text-zinc-500 flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <Link
          className="hover:underline"
          href="https://www.github.com/wajeshubham"
        >
          GitHub
        </Link>
        <Link
          className="hover:underline"
          href="https://stackoverflow.com/users/13483939/shubham-waje"
        >
          Stack Overflow
        </Link>
        <Link
          className="hover:underline"
          href="https://www.linkedin.com/in/shubham-waje/"
        >
          LinkedIn
        </Link>
        <Link className="hover:underline" href="https://wajeshubham.in">
          Portfolio
        </Link>
        <Link className="hover:underline" href="https://blog.wajeshubham.in">
          Blogs
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
