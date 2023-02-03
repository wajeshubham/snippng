import { Button, ErrorText, Loader, SigninButton } from "@/components";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Layout from "@/layout/Layout";
import { SnippngEditorConfigInterface } from "@/types";
import {
  CommandLineIcon,
  FolderOpenIcon,
  LinkIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// TODO: Add HOC to handle secure route mounting
const UserProfile = () => {
  const [savedSnippets, setSavedSnippets] = useState<
    SnippngEditorConfigInterface[]
  >([]);
  const [loadingSnippets, setLoadingSnippets] = useState(true);
  const [deletingSnippet, setDeletingSnippet] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();
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

  const deleteCodeSnippet = async (snippetId: string) => {
    if (!db) return console.log(Error("Firebase is not configured")); // This is to handle error when there is no `.env` file. So, that app doesn't crash while developing without `.env` file.
    if (!user || !snippetId) return;
    setDeletingSnippet(true);
    try {
      await deleteDoc(doc(db, "snippets", snippetId));
      setSavedSnippets(
        savedSnippets.filter((snippet) => snippet.uid !== snippetId)
      );
      addToast({
        message: "Snippet deleted successfully",
      });
    } catch (error) {
      console.log("Error fetching snippets", error);
    } finally {
      setDeletingSnippet(false);
    }
  };

  useEffect(() => {
    fetchCodeSnippets();
  }, [user]);

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
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
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
                                      <li
                                        key={snippet.uid}
                                        className="flex items-center md:justify-between md:flex-row flex-col py-3 pl-3 pr-4 text-sm"
                                      >
                                        <div className="flex flex-shrink-0 flex-1 text-left md:w-fit w-full md:py-0 py-4 items-center dark:text-white text-zinc-900">
                                          <CommandLineIcon
                                            className="h-5 w-5 flex-shrink-0x"
                                            aria-hidden="true"
                                          />
                                          <span className="ml-2 flex-1 truncate">
                                            {snippet.snippetsName}
                                          </span>
                                        </div>
                                        <div className="md:w-fit w-full md:flex-row flex-col flex-shrink-0 gap-3 inline-flex items-center">
                                          <Button
                                            className="md:w-[unset] w-full"
                                            StartIcon={FolderOpenIcon}
                                            onClick={() => {
                                              router.push(
                                                `/snippet/${snippet.uid}`
                                              );
                                            }}
                                          >
                                            Open
                                          </Button>

                                          <Button
                                            className="md:w-[unset] w-full"
                                            StartIcon={LinkIcon}
                                            onClick={() => {
                                              if (!navigator?.clipboard)
                                                return addToast({
                                                  message:
                                                    "navigator unavailable",
                                                  type: "error",
                                                });
                                              navigator.clipboard
                                                ?.writeText(
                                                  `${window.location.host}/snippet/${snippet.uid}`
                                                )
                                                .then(() => {
                                                  addToast({
                                                    message: "Link copied!",
                                                    description:
                                                      "You can share this link to anyone. So that, they can copy or fork this code snippet and can use it anywhere.",
                                                  });
                                                });
                                            }}
                                          >
                                            Copy link
                                          </Button>
                                          <Button
                                            className="!text-red-500 md:w-[unset] w-full"
                                            disabled={deletingSnippet}
                                            StartIcon={TrashIcon}
                                            onClick={() => {
                                              const confirm = window.confirm(
                                                "Are you sure you want to delete this snippet?"
                                              );
                                              if (confirm) {
                                                deleteCodeSnippet(
                                                  snippet.uid ?? ""
                                                );
                                              }
                                            }}
                                          >
                                            Delete
                                          </Button>
                                        </div>
                                      </li>
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
