import { SnippngControlHeader } from "@/components";
import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import { defaultEditorConfig, LANGUAGES, THEMES } from "@/lib/constants";
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

describe("SnippngControlHeader", () => {
  it("renders all CTA and inputs", async () => {
    await act(async () => {
      render(<SnippngControlHeader />);
    });
    await waitFor(() => {
      screen.getByTestId("wrapper-color-picker");
      screen.getByTestId("settings-cta");
    });
  });

  describe("Default theme and language", () => {
    it("renders with VS Code dark as a default theme", async () => {
      await act(async () => {
        render(
          <SnippngEditorContext.Provider
            // @ts-ignore
            value={{
              editorConfig: {
                ...defaultEditorConfig,
                selectedLang:
                  LANGUAGES.find((language) => language.id === "typescript") ||
                  LANGUAGES[0],
                selectedTheme:
                  THEMES.find((theme) => theme.id === "vscodeDark") ||
                  THEMES[0],
              },
            }}
          >
            <SnippngControlHeader />
          </SnippngEditorContext.Provider>
        );
      });
      await waitFor(() => {
        screen.getByText("VS Code Dark");
      });
    });

    it("renders with TypeScript as a default language", async () => {
      await act(async () => {
        render(<SnippngControlHeader />);
      });
      await waitFor(() => {
        screen.getByText("TypeScript");
      });
    });
  });
});
