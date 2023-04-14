import { Head, Html, Main, NextScript } from "next/document";

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage̦', updateModeWithoutTransitions)

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

// const adSenseScript = `
// (adsbygoogle = (window.adsbygoogle || [])).push({});
// `;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          property="og:image"
          content="https://wajeshubham-portfolio.s3.ap-south-1.amazonaws.com/snippng-cover.png"
        />
        <meta property="og:url" content="https://snippng.wajeshubham.in/" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:image"
          content="https://wajeshubham-portfolio.s3.ap-south-1.amazonaws.com/snippng-cover.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://snippng.wajeshubham.in" />
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
        <meta name="application-name" content="Snippng" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Snippng" />
        <meta
          name="description"
          content="Create and share beautiful images of your source code."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/logo-512x512.svg" />
        <link rel="apple-touch-icon" sizes="192x192" href="/logo-196x196.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/logo-256x256.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/logo-512x512.png" />

        <link rel="manifest" href="/manifest.json" />

        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script dangerouslySetInnerHTML={{ __html: faviconScript }} />
        {/* TODO: Configure adsense */}
        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
        ></script>
        <script dangerouslySetInnerHTML={{ __html: adSenseScript }} />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          data-ad-slot={`${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          data-full-width-responsive="true"
        ></ins> */}
      </Head>
      <body className="!min-h-screen bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
