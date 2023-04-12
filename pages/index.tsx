import {
  Button,
  NoSSRWrapper,
  SnippngCodeArea,
  SnippngWindowControls,
} from "@/components";
import GithubIcon from "@/components/icons/GithubIcon";
import Layout from "@/layout/Layout";
import { getAvailableThemes, LANGUAGES } from "@/lib/constants";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const focusOnGenerate = () => {
    let codeArea = document.getElementById("snippng-code-area");
    if (codeArea) {
      codeArea.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    let timer: NodeJS.Timeout;
    let goToEditor = router.asPath.split("#").includes("snippng-code-area");
    if (goToEditor) {
      timer = setTimeout(() => {
        focusOnGenerate();
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [router.isReady]);

  return (
    <Layout>
      <div data-testid="landing-container" className="bg-transparent">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-12">
            <div className="lg:pt-4">
              <div className="mx-auto max-w-2xl">
                <div className="max-w-lg">
                  <div className="sm:mt-10 lg:mt-16 text-zinc-700 dark:text-zinc-100">
                    <a
                      href="#"
                      className="inline-flex flex-wrap ms:space-x-4 space-x-2 md:text-sm text-xs"
                    >
                      <NoSSRWrapper>
                        <span className="inline-flex items-center font-medium leading-6">
                          {getAvailableThemes().length} themes
                        </span>
                      </NoSSRWrapper>
                      <svg
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="w-0.5 fill-current"
                      >
                        <circle cx="1" cy="1" r="1"></circle>
                      </svg>
                      <span className="inline-flex items-center font-medium leading-6">
                        {LANGUAGES.length} languages
                      </span>
                      <svg
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="w-0.5 fill-current"
                      >
                        <circle cx="1" cy="1" r="1"></circle>
                      </svg>
                      <span className="inline-flex items-center font-medium leading-6">
                        <span>v{require("../package.json").version}</span>
                      </span>
                    </a>
                  </div>
                  <h1 className="md:mt-10 mt-4 md:text-5xl text-4xl font-bold tracking-tight dark:text-white text-zinc-900 sm:text-6xl">
                    Snippng
                  </h1>
                  <p className="mt-6 md:text-lg text-sm dark:text-zinc-300 text-zinc-600">
                    Write, customize and download gorgeous images of your code
                    snippet. Beautifully designed application that helps you
                    generate beautiful and customizable images of your code
                    snippets.
                  </p>
                  <div className="mt-10 flex md:flex-row flex-col md:items-center items-start gap-6 ml-1">
                    <Button
                      StartIcon={PlusCircleIcon}
                      onClick={focusOnGenerate}
                    >
                      Generate
                    </Button>
                    <a
                      href="https://github.com/wajeshubham/snippng"
                      target={"_blank"}
                      rel="noreferrer"
                      className="text-sm dark:text-white text-zinc-900 inline-flex items-center"
                    >
                      <GithubIcon className="mr-1" />
                      Contribute on GitHub{" "}
                      <span className="ml-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
              <div
                className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-transparent shadow-xl shadow-indigo-600/10 ring-1 dark:ring-zinc-600 ring-indigo-50 md:-mr-20 lg:-mr-36"
                aria-hidden="true"
              />
              <div className="shadow-lg md:rounded-3xl">
                <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                  <div
                    className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                    aria-hidden="true"
                  />
                  <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                    <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                      <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                        <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                          <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                            <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 pb-2 pt-3 px-4 text-white">
                              <SnippngWindowControls type="mac-left" />
                            </div>
                            <div className="border-r border-gray-600/10 py-2 px-4">
                              App.jsx
                            </div>
                          </div>
                        </div>
                        <div className="px-6 pt-6 pb-6">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `<pre class="text-[0.8125rem] leading-6 text-gray-300"><code><span class="text-[#ff8c28]">import</span> { <span class="text-[#7dd3fc]">useState</span> } <span class="text-[#ff8c28]">from</span> <span class="text-emerald-300">'react'</span>
<span class="text-[#ff8c28]">import</span> { <span class="text-[#7dd3fc]">Switch</span> } <span class="text-[#ff8c28]">from</span> <span class="text-emerald-300">'@headlessui/react'</span>

<span class="text-[#FFC623]"><span class="text-[#ff8c28]">export const</span> Example</span> <span class="text-[#ff8c28]">=</span> () <span class="text-[#ff8c28]">=></span> {
  <span class="text-[#ff8c28]">&nbsp;&nbsp;const</span> [<span class="text-[#7dd3fc]">enabled</span>, <span class="text-[#7dd3fc]">setEnabled</span>] = <span class="text-[#FFC623]">useState</span>(<span class="text-[#7dd3fc]">true</span>)

  <span class="text-[#ff8c28]">&nbsp;&nbsp;return</span> (
      &lt;<span class="text-indigo-400">form</span> action="/<span class="text-emerald-300">notification-settings</span>" method="<span class="text-emerald-300">post</span>"&gt;
        &lt;<span class="text-indigo-400">Switch</span> checked={<span class="text-[#7dd3fc]">enabled</span>} onChange={<span class="text-[#7dd3fc]">setEnabled</span>} name="<span class="text-emerald-300">notifications</span>"&gt;
          {<span class="text-gray-500">/* ... */</span>}
        &lt;/<span class="text-indigo-400">Switch</span>&gt;
        &lt;<span class="text-indigo-400">button</span>&gt;Submit&lt;/<span class="text-indigo-400">button</span>&gt;
      &lt;/<span class="text-indigo-400">form</span>&gt;
    )
}</code></pre>`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SnippngCodeArea />
    </Layout>
  );
}
