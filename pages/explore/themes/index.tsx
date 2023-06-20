import PublishedThemeListing from "@/components/explore/PublishedThemeListing";
import Layout from "@/layout/Layout";
import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";

const PublishedThemes = () => {
  return (
    <Layout
      title="Create your own theme | Snippng"
      description="Create and share your own code theme."
    >
      <div className="w-full mb-4">
        <h3 className="text-xl dark:text-white inline-flex items-center gap-2 font-semibold text-zinc-900">
          <SparklesIcon className="w-5 h-5" /> Explore themes
        </h3>
        <div className="w-full text-sm dark:text-zinc-400 text-zinc-500">
          <p>
            Explore and fork themes configured by other developers in community
          </p>
        </div>
      </div>
      <PublishedThemeListing />
    </Layout>
  );
};

export default PublishedThemes;
