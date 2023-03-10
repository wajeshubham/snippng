import { AuthContext } from "@/context/AuthContext";
import Home from "@/pages";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

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

const mockedUser = {
  displayName: "John Doe",
  email: "john@doe.com",
  uid: "uid-test",
};

jest.mock("next/router", () => require("next-router-mock"));

describe("Auth", () => {
  it("renders signin button for logged out user", async () => {
    await act(async () => {
      render(<Home />);
    });
    screen.getByTestId("signin-btn");
  });

  it("renders username and logout button for logged in user", async () => {
    await act(async () => {
      render(
        // @ts-ignore
        <AuthContext.Provider
          // @ts-ignore
          value={{ user: mockedUser }}
        >
          <Home />
        </AuthContext.Provider>
      );
    });
    await waitFor(() => {
      screen.getByText("John Doe");
      screen.getByTestId("logout-btn");
    });
  });
});
