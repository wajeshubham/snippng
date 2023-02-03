import { BugAntIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent">
      <div className="w-full py-10 gap-5 text-xs dark:text-zinc-400 text-zinc-600 flex justify-center items-center flex-wrap max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
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
        <Link
          className="inline-flex hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://github.com/wajeshubham/snippng/issues/new"
        >
          <BugAntIcon className="w-4 h-4 mr-1" /> Report a bug
        </Link>
        <Link
          className="inline-flex hover:underline hover:dark:text-white hover:text-zinc-900"
          href="https://github.com/wajeshubham/snippng/issues/new"
        >
          <RocketLaunchIcon className="w-4 h-4 mr-1" /> Request a feature
        </Link>{" "}
      </div>
    </footer>
  );
};

export default Footer;
