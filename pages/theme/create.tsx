import withAuth from "@/HOC/withAuth";
import { SnippngThemeBuilder } from "@/components";
import Layout from "@/layout/Layout";
import { SparklesIcon } from "@heroicons/react/24/outline";

const CreateTheme = () => {
  return (
    <Layout
      title="Create your own theme | Snippng"
      description="Create and share your own code theme."
    >
      <div className="w-full mb-4">
        <h3 className="text-xl dark:text-white inline-flex items-center gap-2 font-semibold text-zinc-900">
          <SparklesIcon className="w-5 h-5" /> Create a theme
        </h3>
        <div className="w-full text-sm dark:text-zinc-400 text-zinc-500">
          <p>
            Configure a new theme by configuring different aspects of the code
            and save it to use it later.
          </p>
        </div>
      </div>
      <SnippngThemeBuilder />
    </Layout>
  );
};

export default withAuth(CreateTheme);
