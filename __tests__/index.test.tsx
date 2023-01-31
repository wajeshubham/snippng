import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";

beforeAll(() => {
  document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = jest.fn();

    range.getClientRects = () => {
      return {
        item: () => null,
        length: 0,
        [Symbol.iterator]: jest.fn(),
      };
    };

    return range;
  };
});

jest.mock("next/router", () => require("next-router-mock"));

describe("LandingPage", () => {
  it("renders the landing page", async () => {
    await act(async () => {
      render(<Home />);
    });
    await waitFor(() => {
      screen.getByTestId("landing-container");
    });
  });
});
