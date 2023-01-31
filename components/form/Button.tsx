import { clsx } from "@/utils";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  StartIcon?: ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) | null;
  EndIcon?: ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) | null;
}

const Button: React.FC<Props> = ({ StartIcon, EndIcon, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "py-1.5 text-sm flex-shrink-0 disabled:opacity-60 inline-flex items-center px-3 rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:text-white text-zinc-900 dark:bg-black dark:hover:bg-zinc-800 hover:bg-zinc-100 bg-white",
        props.className ?? ""
      )}
    >
      {StartIcon ? <StartIcon className="w-4 h-4 mr-2" /> : null}
      {props.children}
      {EndIcon ? <EndIcon className="w-4 h-4 ml-2" /> : null}
    </button>
  );
};

export default Button;

export type SnippngButtonType = Props;
