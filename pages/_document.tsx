import { Html, Head, Main, NextScript } from "next/document";

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isDarkMode = window.localStorage.isDarkMode === 'true'
    let isLightMode = window.localStorage.isDarkMode === 'false'

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else if(isLightMode) {
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.setItem("isDarkMode", true)
      document.documentElement.classList.add('dark')
    }

  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </Head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
