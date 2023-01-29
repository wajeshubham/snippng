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

const faviconScript = `
  let matcher = window.matchMedia('(prefers-color-scheme: dark)');
  matcher.addListener(onUpdate);

  let lightSchemeIcon = document.querySelector('link#light-scheme-icon');
  let darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

  function onUpdate() {
    if (matcher.matches) {
      lightSchemeIcon.remove();
      document.head.append(darkSchemeIcon);
    } else {
      document.head.append(lightSchemeIcon);
      darkSchemeIcon.remove();
    }
  }

  onUpdate();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content="https://snippng.wajeshubham.in/" />
        <meta property="og:type" content="website" />
        <link
          rel="icon"
          id="dark-scheme-icon"
          href="/logo-dark.svg"
          type="image/svg+xml"
        />
        <link
          rel="icon"
          id="light-scheme-icon"
          href="/logo.svg"
          type="image/svg+xml"
        />
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script dangerouslySetInnerHTML={{ __html: faviconScript }} />
      </Head>
      <body className="!min-h-screen bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
