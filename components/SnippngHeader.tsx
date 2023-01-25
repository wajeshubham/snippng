import React from "react";

const MacHeader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="54"
    height="14"
    viewBox="0 0 54 14"
  >
    <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
      <circle
        cx="6"
        cy="6"
        r="6"
        fill="#FF5F56"
        stroke="#E0443E"
        stroke-width=".5"
      ></circle>
      <circle
        cx="26"
        cy="6"
        r="6"
        fill="#FFBD2E"
        stroke="#DEA123"
        stroke-width=".5"
      ></circle>
      <circle
        cx="46"
        cy="6"
        r="6"
        fill="#27C93F"
        stroke="#1AAB29"
        stroke-width=".5"
      ></circle>
    </g>
  </svg>
);
const WindowsHeader = () => (
  <svg
    width="58"
    height="14"
    viewBox="0 0 58 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 7H11"
      stroke="#878787"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M35 1H25C24.4477 1 24 1.44772 24 2V12C24 12.5523 24.4477 13 25 13H35C35.5523 13 36 12.5523 36 12V2C36 1.44772 35.5523 1 35 1Z"
      stroke="#878787"
    ></path>
    <path
      d="M47 2L57 12"
      stroke="#878787"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M47 12L57 2"
      stroke="#878787"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

const SnippngHeader: React.FC<{
  type: "mac-left" | "mac-right" | "windows-left" | "windows-right";
}> = ({ type = "mac-left" }) => {
  switch (type) {
    case "mac-left":
      return (
        <span>
          <MacHeader />
        </span>
      );
    case "mac-right":
      return (
        <span className="ml-auto table">
          <MacHeader />
        </span>
      );
    case "windows-left":
      return (
        <span>
          <WindowsHeader />
        </span>
      );
    case "windows-right":
      return (
        <span className="ml-auto table">
          <WindowsHeader />
        </span>
      );

    default:
      return (
        <span>
          <MacHeader />
        </span>
      );
  }
};

export default SnippngHeader;
