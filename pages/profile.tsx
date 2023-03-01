import { Button, ErrorText, Loader, SigninButton } from "@/components";
import SnippngListItem from "@/components/profile/SnippngListItem";
import SnippngThemeItem from "@/components/profile/SnippngThemeItem";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useCustomTheme } from "@/context/SnippngCustomThemeContext";
import Layout from "@/layout/Layout";
import {
  SnippngEditorConfigInterface,
  SnippngThemeAttributesInterface,
} from "@/types";
import { LocalStorage } from "@/utils";
import {
  PlusCircleIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// TODO: Add HOC to handle secure route mounting
const UserProfile = () => {
  const [savedSnippets, setSavedSnippets] = useState<
    SnippngEditorConfigInterface[]
  >([]);
  const [savedThemes, setSavedThemes] = useState<
    SnippngThemeAttributesInterface[]
  >([]);
  const [loadingSnippets, setLoadingSnippets] = useState(true);

  const { user } = useAuth();
  const { setOpen, open } = useCustomTheme();
  const router = useRouter();

  const fetchCodeSnippets = async () => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user) return;
    try {
      const snippets: SnippngEditorConfigInterface[] = [];
      const docRef = await getDocs(
        query(collection(db, "snippets"), where("ownerUid", "==", user.uid))
      );
      docRef.forEach((doc) => {
        snippets.push({
          ...doc.data(),
          uid: doc.id,
        } as SnippngEditorConfigInterface);
      });
      setSavedSnippets(snippets);
    } catch (error) {
      console.log("Error fetching snippets", error);
    } finally {
      setLoadingSnippets(false);
    }
  };

  useEffect(() => {
    fetchCodeSnippets();
  }, [user]);

  useEffect(() => {
    if (!open) {
      let localThemes =
        (LocalStorage.get(
          "local_themes"
        ) as SnippngThemeAttributesInterface[]) || [];
      setSavedThemes(localThemes);
    }
  }, [open]);

  return (
    <Layout
      title={`${user?.displayName || "Snippng"} | code snippets to image`}
    >
      {!user ? (
        <div
          data-testid="signin-btn-container"
          className="w-full h-full flex justify-center items-center py-32"
        >
          <SigninButton />
        </div>
      ) : (
        <div>
          <div className="min-h-full">
            <main className="py-10">
              {/* Page header */}
              <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        className="h-16 w-16 rounded-full border-[1px] dark:border-white border-zinc-900"
                        src={user.photoURL || ""}
                        alt=""
                      />
                      <span
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {user.displayName || "Snippng user"}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-300">
                      {user.email || "Snippng user"}
                    </p>
                  </div>
                </div>
                <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <Button
                    StartIcon={PlusCircleIcon}
                    onClick={() => router.push("/#snippng-code-area")}
                  >
                    Generate snippet
                  </Button>
                </div>
              </div>

              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-3 lg:col-start-1">
                  <section aria-labelledby="saved-snippets-section">
                    <div className="dark:bg-zinc-800 bg-white border-[1px] dark:border-zinc-500 border-zinc-200 shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-sm mb-4 font-medium dark:text-white text-zinc-900">
                              Saved snippets
                            </dt>
                            <dd className="mt-1 text-sm text-zinc-900">
                              {!loadingSnippets ? (
                                savedSnippets.length ? (
                                  <ul
                                    role="list"
                                    className="divide-y dark:divide-zinc-500 divide-zinc-200 rounded-md border-[1px] dark:border-zinc-500 border-zinc-200"
                                  >
                                    {savedSnippets.map((snippet) => (
                                      <SnippngListItem
                                        key={snippet.uid}
                                        snippet={snippet}
                                        onDelete={(uid) => {
                                          setSavedSnippets((prevSnippets) =>
                                            [...prevSnippets].filter(
                                              (snippet) => snippet.uid !== uid
                                            )
                                          );
                                        }}
                                      />
                                    ))}
                                  </ul>
                                ) : (
                                  <ErrorText
                                    errorTitle="No snippets found"
                                    errorSubTitle="Please generate some snippets to list them here"
                                    errorActionProps={{
                                      children: "Generate",
                                      StartIcon: PlusIcon,
                                      onClick: () =>
                                        router.push("/#snippng-code-area"),
                                    }}
                                  />
                                )
                              ) : (
                                <Loader />
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="saved-themes-section">
                    <div className="dark:bg-zinc-800 bg-white border-[1px] dark:border-zinc-500 border-zinc-200 shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <div className="flex justify-between items-center w-full mb-4">
                              <dt className="text-sm font-medium items-center dark:text-white text-zinc-900">
                                Saved themes
                              </dt>
                              <Button
                                StartIcon={SparklesIcon}
                                onClick={() => {
                                  setOpen(true);
                                }}
                              >
                                Create theme
                              </Button>
                            </div>
                            <dd className="mt-1 text-sm text-zinc-900">
                              {savedThemes.length ? (
                                <ul
                                  role="list"
                                  className="grid md:grid-cols-2 grid-cols-1 gap-4"
                                >
                                  {savedThemes.map((theme) => (
                                    <SnippngThemeItem
                                      key={theme.id}
                                      theme={theme}
                                      onDelete={(themeId) => {
                                        setSavedThemes(
                                          [...savedThemes].filter(
                                            (thm) => thm.id !== themeId
                                          )
                                        );
                                      }}
                                    />
                                  ))}
                                </ul>
                              ) : (
                                <ErrorText
                                  errorTitle="No themes found"
                                  errorSubTitle="Please construct some themes to list them here"
                                  errorActionProps={{
                                    children: "Construct",
                                    StartIcon: SparklesIcon,
                                    onClick: () => {
                                      setOpen(true);
                                    },
                                  }}
                                />
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserProfile;
