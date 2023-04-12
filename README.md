<!-- Improved compatibility of back to top link: See: https://github.com/wajeshubham/snippng/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <img width="400px" style="margin-right:12px" src="https://wajeshubham-portfolio.s3.ap-south-1.amazonaws.com/git-logo.png" alt="Logo"/>

  <p align="center">
    Create and share beautiful images of your source code.
    <br />
    <br/>
    <a href="https://snippng.wajeshubham.in">Generate snippets</a>
    ·
    <a href="https://github.com/wajeshubham/snippng/issues">Report Bug</a>
    ·
    <a href="https://github.com/wajeshubham/snippng/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

 <a href="https://snippng.wajeshubham.in">
    <img src="https://wajeshubham-portfolio.s3.ap-south-1.amazonaws.com/snippng-cover.png" alt="Logo">
  </a>

Create and share beautiful images of your source code. Start typing or paste a code snippet into the text area to get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- [![Next][next.js]][next-url]
- [![NodeJs][node.js]][node-url]
- [![Typescript][typescript]][typescript-url]
- [![React][react.js]][react-url]
- [![tailwindcss][tailwindcss]][tailwindcss-url]
- [![Firebase][firebase]][firebase-url]
- [![Jest][jest]][jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

You need `NodeJs` and `yarn` installed on your machine.

- yarn
  ```sh
  npm install --global yarn
  ```

### Firebase prerequisites (optional)

Firebase is used in this project for authentications and to store snippets. In order to contribute in the part requiring Firebase, create a file called `.env` inside the root folder and add the following credentials in it once you create a Firebase app.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=<your_FIREBASE_APP_API_KEY>

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_FIREBASE_APP_AUTH_DOMAIN>

NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_FIREBASE_APP_PROJECT_ID>

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_FIREBASE_APP_STORAGE_BUCKET>

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_FIREBASE_APP_MESSAGING_SENDER_ID>

NEXT_PUBLIC_FIREBASE_APP_ID=<your_FIREBASE_APP_APP_ID>

NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your_FIREBASE_APP_MEASUREMENT_ID>

NEXT_PUBLIC_PEXELS_API_KEY=<your_NEXT_PUBLIC_PEXELS_API_KEY>

# don't change the following env var
NEXT_PUBLIC_PEXELS_QUERY_URL=https://api.pexels.com/v1

```

It does not matter what credentials you add to your `.env` file, as the app won't crash while developing since the error is taken care of for the Firebase services that are unavailable.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/wajeshubham/snippng.git
   ```
2. Install NPM packages
   ```sh
   yarn
   ```

### Run locally

1. Run the development server
   ```sh
   yarn dev
   ```
2. Run the test to test your changes
   ```sh
   yarn test
   ```

OR

1. Run using `docker`. make sur you have [Docker](https://docs.docker.com/get-docker/) installed on your machine.
   ```sh
   docker-compose up --build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Inject images in the background from url and pexels
- [x] Import and export snippng config to quickly build the editor (download the JSON file with editor config)
- [ ] Add theme presets to choose from
- [ ] Option to create/save single default editor config for user
- [x] Custom theme configuration
- [ ] Publish your themes
- [ ] Build more themes to choose from

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Do some magic 🪄 inside the code. Write/Run tests before committing
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Shubham Waje - [@linkedin/shubham-waje](https://linkedin.com/in/shubham-waje)

Project Link: [https://snippng.wajeshubham.in](https://snippng.wajeshubham.in)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/wajeshubham/snippng?style=for-the-badge
[contributors-url]: https://github.com/wajeshubham/snippng/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wajeshubham/snippng?style=for-the-badge
[forks-url]: https://github.com/wajeshubham/snippng/network/members
[stars-shield]: https://img.shields.io/github/stars/wajeshubham/snippng?style=for-the-badge
[stars-url]: https://github.com/wajeshubham/snippng/stargazers
[issues-shield]: https://img.shields.io/github/issues/wajeshubham/snippng?style=for-the-badge
[issues-url]: https://github.com/wajeshubham/snippng/issues
[license-shield]: https://img.shields.io/github/license/wajeshubham/snippng?style=for-the-badge
[license-url]: https://github.com/wajeshubham/snippng/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/shubham-waje
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[tailwindcss]: https://img.shields.io/badge/Tailwind-000000?style=for-the-badge&logo=tailwindcss&logoColor=white
[tailwindcss-url]: https://tailwindcss.com
[typescript]: https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://typescriptlang.org
[firebase]: https://img.shields.io/badge/firebase-000000?style=for-the-badge&logo=firebase&logoColor=ffa611
[firebase-url]: https://firebase.google.com/
[node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=node.js&logoColor=68a063
[node-url]: https://nodejs.org/
[jest]: https://img.shields.io/badge/jest-000000?style=for-the-badge&logo=jest&logoColor=c21325
[jest-url]: https://jestjs.io/
