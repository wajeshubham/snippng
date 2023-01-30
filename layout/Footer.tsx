import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent">
      <div className="w-full h-16 gap-4 text-xs dark:text-zinc-400 text-zinc-600 flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <Link
          className="hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://www.github.com/wajeshubham"
        >
          GitHub
        </Link>
        <Link
          className="hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://stackoverflow.com/users/13483939/shubham-waje"
        >
          Stack Overflow
        </Link>
        <Link
          className="hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://www.linkedin.com/in/shubham-waje/"
        >
          LinkedIn
        </Link>
        <Link
          className="hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://wajeshubham.in"
        >
          Portfolio
        </Link>
        <Link
          className="hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://blog.wajeshubham.in"
        >
          Blogs
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
