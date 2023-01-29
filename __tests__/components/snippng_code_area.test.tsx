import { SnippngCodeArea, SnippngControlHeader } from "@/components";
import { SnippngEditorContext } from "@/context/SnippngEditorContext";
import { defaultEditorConfig } from "@/lib/constants";
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

describe("SnippngCodeArea", () => {
  it("renders the editor", async () => {
    await act(async () => {
      render(<SnippngCodeArea />);
    });
    await waitFor(() => {
      screen.getByTestId("snippng-code-area");
    });
  });

  describe("showLineNumbers flag", () => {
    it("renders WITH line count when showLineNumbers flag is true", async () => {
      await act(async () => {
        render(<SnippngCodeArea />);
      });
      const lineGutters = document.querySelector(".cm-gutters");
      await waitFor(() => {
        expect(lineGutters).toBeInTheDocument();
      });
    });

    it("renders WITHOUT line count when showLineNumbers flag is false", async () => {
      await act(async () => {
        render(
          <SnippngEditorContext.Provider
            // @ts-ignore
            value={{
              editorConfig: { ...defaultEditorConfig, showLineNumbers: false },
              // override showLineNumbers with false
            }}
          >
            <SnippngCodeArea />
          </SnippngEditorContext.Provider>
        );
      });
      const lineGutters = document.querySelector(".cm-gutters");
      await waitFor(() => {
        expect(lineGutters).not.toBeInTheDocument();
      });
    });
  });

  describe("hasDropShadow flag", () => {
    it("renders WITH box-shadow when hasDropShadow flag is true", async () => {
      await act(async () => {
        render(<SnippngCodeArea />);
      });
      const editorWithShadow = document.querySelector(
        ".has-drop-shadow-testclass"
      );
      await waitFor(() => {
        expect(editorWithShadow).toBeInTheDocument();
      });
    });

    it("renders WITHOUT box-shadow when hasDropShadow flag is false", async () => {
      await act(async () => {
        render(
          <SnippngEditorContext.Provider
            // @ts-ignore
            value={{
              editorConfig: { ...defaultEditorConfig, hasDropShadow: false },
              // override hasDropShadow with false
            }}
          >
            <SnippngCodeArea />
          </SnippngEditorContext.Provider>
        );
      });
      const editorWIthShadow = document.querySelector(
        ".has-drop-shadow-testclass"
      );
      await waitFor(() => {
        expect(editorWIthShadow).not.toBeInTheDocument();
      });
    });
  });

  describe("rounded flag", () => {
    it("renders WITH rounded corners when rounded flag is true", async () => {
      await act(async () => {
        render(<SnippngCodeArea />);
      });
      const editorWithShadow = document.querySelector(".rounded-testclass");
      await waitFor(() => {
        expect(editorWithShadow).toBeInTheDocument();
      });
    });

    it("renders WITHOUT rounded corners when rounded flag is false", async () => {
      await act(async () => {
        render(
          <SnippngEditorContext.Provider
            // @ts-ignore
            value={{
              editorConfig: { ...defaultEditorConfig, rounded: false },
              // override rounded with false
            }}
          >
            <SnippngCodeArea />
          </SnippngEditorContext.Provider>
        );
      });
      const editorWIthShadow = document.querySelector(".rounded-testclass");
      await waitFor(() => {
        expect(editorWIthShadow).not.toBeInTheDocument();
      });
    });
  });

  describe("showFilename flag", () => {
    it("renders the editor WITH file name when showFilename flag is true", async () => {
      await act(async () => {
        render(<SnippngCodeArea />);
      });
      const fileNameInput = document.getElementById(
        "file-name-input"
      ) as HTMLInputElement;
      const value = fileNameInput.value;
      await waitFor(() => {
        expect(value).toBe("@utils/debounce.ts");
      });
    });

    it("renders the editor WITHOUT file name when showFilename flag is false", async () => {
      await act(async () => {
        render(
          <SnippngEditorContext.Provider
            // @ts-ignore
            value={{
              editorConfig: { ...defaultEditorConfig, showFileName: false },
              // override hasDropShadow with false
            }}
          >
            <SnippngCodeArea />
          </SnippngEditorContext.Provider>
        );
      });
      const fileNameInput = document.getElementById(
        "file-name-input"
      ) as HTMLInputElement;
      await waitFor(() => {
        expect(fileNameInput).not.toBeInTheDocument();
      });
    });
  });

  describe("wrapperBg property", () => {
    it("renders wrapper with background-color equals to the color selected with color picker input", async () => {
      await act(async () => {
        render(
          <SnippngEditorContext.Provider
            // @ts-ignore
            value={{
              editorConfig: {
                ...defaultEditorConfig,
                gradients: [],
                wrapperBg: "#eee811",
              },
              // override hasDropShadow with false
            }}
          >
            <SnippngCodeArea />
          </SnippngEditorContext.Provider>
        );
        render(<SnippngControlHeader />);
      });
      const colorPicker = document.getElementById(
        "color-picker"
      ) as HTMLInputElement;
      const wrapper = document.getElementById("code-wrapper") as HTMLDivElement;

      // create div and assign backgroundColor from color-picker to convert the hex-code to rgb format for the comparison
      let container = document.createElement("div");
      container.style.backgroundColor = colorPicker.value;

      let wrapperBackgroundColor = wrapper.style.backgroundColor; // returns rgb format color
      let selectedBackgroundColor = container.style.backgroundColor;
      await waitFor(() => {
        expect(selectedBackgroundColor).toBe(wrapperBackgroundColor);
      });
    });
  });
});
