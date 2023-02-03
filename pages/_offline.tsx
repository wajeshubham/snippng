import { ErrorText } from "@/components";
import Layout from "@/layout/Layout";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const OfflinePage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full py-32">
        <ErrorText
          errorTitle="Looks like you are offline! :-("
          ErrorIcon={ExclamationTriangleIcon}
          errorSubTitle="Check your network connection and try again!"
          errorActionProps={{
            children: "Try again",
            onClick: () => {
              router.push("/");
            },
          }}
        />
      </div>
    </Layout>
  );
};

export default OfflinePage;
