import { SnippngThemeBuilder } from "@/components";
import Layout from "@/layout/Layout";

const CreateTheme = () => {
  return (
    <Layout
      title="Create your own theme | Snippng"
      description="Create and share your own code theme."
    >
      <SnippngThemeBuilder />
    </Layout>
  );
};

export default CreateTheme;
