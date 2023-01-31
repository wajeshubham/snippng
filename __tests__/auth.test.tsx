import { AuthContext } from "@/context/AuthContext";
import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import { defaultEditorConfig } from "@/lib/constants";
import Home from "@/pages";
import UserProfile from "@/pages/profile";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

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

  it("renders signin button on profile page for logged out user", async () => {
    await act(async () => {
      render(<UserProfile />);
    });
    await waitFor(() => {
      screen.getByTestId("signin-btn-container");
    });
  });

  it("renders user email if user is logged in", async () => {
    await act(async () => {
      render(
        // @ts-ignore
        <AuthContext.Provider
          // @ts-ignore
          value={{ user: mockedUser }}
        >
          <UserProfile />
        </AuthContext.Provider>
      );
    });
    await waitFor(() => {
      screen.getByText("john@doe.com");
    });
  });

  // TODO: alert is getting replaced by toast in future
  it("restricts user from saving snippet if user is NOT logged in", async () => {
    window.alert = jest.fn(() => true);

    await act(async () => {
      render(
        <SnippngEditorContext.Provider
          value={{
            editorConfig: {
              ...defaultEditorConfig,
              snippetsName: "Test snippet",
            },
            // @ts-ignore
            handleConfigChange: () => {},
            // override hasDropShadow with false
          }}
        >
          <Home />
        </SnippngEditorContext.Provider>
      );
    });
    const saveSnippetsBtn = document.getElementById("save-snippet-btn");
    await act(async () => {
      saveSnippetsBtn?.click();
    });
    expect(window.alert).toBeCalled();
  });

  it("does not show alert on clicking save snippets button while user is logged in", async () => {
    window.alert = jest.fn(() => true);

    await act(async () => {
      render(
        // @ts-ignore
        <AuthContext.Provider
          // @ts-ignore
          value={{ user: mockedUser }}
        >
          <SnippngEditorContext.Provider
            value={{
              editorConfig: {
                ...defaultEditorConfig,
                snippetsName: "Test snippet",
              },
              // @ts-ignore
              handleConfigChange: () => {},
              // override hasDropShadow with false
            }}
          >
            <Home />
          </SnippngEditorContext.Provider>
        </AuthContext.Provider>
      );
    });
    const saveSnippetsBtn = document.getElementById("save-snippet-btn");
    await act(async () => {
      saveSnippetsBtn?.click();
    });
    expect(window.alert).not.toBeCalled();
  });
});
