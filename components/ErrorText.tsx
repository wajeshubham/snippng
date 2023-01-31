import React from "react";
import Button, { SnippngButtonType } from "./form/Button";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

interface Props {
  errorTitle: string;
  errorSubTitle?: string;
  errorActionProps?: SnippngButtonType;
  ErrorIcon?: ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) | null;
}

const ErrorText: React.FC<Props> = ({
  errorTitle,
  errorSubTitle,
  errorActionProps,
  ErrorIcon,
}) => {
  return (
    <div className="text-center py-8">
      {ErrorIcon ? (
        <ErrorIcon className="mx-auto h-12 w-12 text-zinc-400" />
      ) : (
        <FolderPlusIcon className="mx-auto h-12 w-12 text-zinc-400" />
      )}
      <h3 className="mt-2 text-sm font-medium dark:text-white text-zinc-900">
        {errorTitle}
      </h3>
      {errorSubTitle ? (
        <p className="mt-1 text-sm dark:text-zinc-400 text-zinc-500">
          {errorSubTitle}
        </p>
      ) : null}
      {errorActionProps ? (
        <div className="mt-6">
          <Button {...errorActionProps}>{errorActionProps.children}</Button>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorText;
