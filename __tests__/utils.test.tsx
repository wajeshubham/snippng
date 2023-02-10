import { DEFAULT_RANGES, DEFAULT_WIDTHS } from "@/lib/constants";
import { deepClone, validateSnippngConfig } from "@/utils";

const mockJSON = {
  code: "",
  snippetsName: "",
  editorFontSize: 16,
  editorWindowControlsType: "mac-left" as const,
  fileName: "@utils/debounce.ts",
  hasDropShadow: true,
  lineHeight: 19,
  paddingHorizontal: 70,
  paddingVertical: 70,
  rounded: true,
  selectedLang: { label: "TypeScript", id: "typescript" },
  selectedTheme: { id: "tokyoNightStorm", label: "Tokyo Night Storm" },
  showFileName: true,
  showLineNumbers: true,
  wrapperBg: "#eee811",
  gradients: ["#ba68c8", "#ffa7c4", "#e57373"],
  gradientAngle: 140,
  editorWidth: 450,
  bgImageVisiblePatch: null,
  bgBlur: 0,
};

const inValidJSON = {
  invalidKey: "invalid value",
};

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

describe("Utils", () => {
  it("deep clones the javascript object", async () => {
    let date = new Date().toISOString();
    let updatedDate = new Date().setFullYear(2002);

    const objectToBeCloned = {
      name: "John",
      age: 20,
      marks: {
        science: 70,
        math: 75,
      },
      birthDate: date,
    };
    const clonedObject = deepClone(objectToBeCloned);
    clonedObject.name = "Updated";
    clonedObject.marks.science = 10;
    clonedObject.birthDate = updatedDate;

    expect(objectToBeCloned.name).toBe("John");
    expect(objectToBeCloned.marks.science).toBe(70);
    expect(objectToBeCloned.birthDate).toBe(date);

    expect(clonedObject.name).toBe("Updated");
    expect(clonedObject.marks.science).toBe(10);
    expect(clonedObject.birthDate).toBe(updatedDate);
  });

  it("validates editor config coming from uploaded JSON file", async () => {
    let minValues = DEFAULT_RANGES.min;
    let maxValues = DEFAULT_RANGES.max;
    const mockOneResult = validateSnippngConfig({ ...mockJSON });

    const mockMissingKeyResult = validateSnippngConfig({
      ...mockJSON,
      selectedLang: undefined as any,
    });

    const mockInvalidKeyResult = validateSnippngConfig({
      ...mockJSON,
      selectedLang: [] as any,
    });

    const mockBlueCheckResult = validateSnippngConfig({
      ...mockJSON,
      bgBlur: 100,
    });
    const mockLineHeightResult = validateSnippngConfig({
      ...mockJSON,
      lineHeight: 100,
    });
    const mockPadHorResult = validateSnippngConfig({
      ...mockJSON,
      paddingHorizontal: 200,
    });
    const mockPadVerResult = validateSnippngConfig({
      ...mockJSON,
      paddingVertical: 200,
    });
    const mockFontSizeResult = validateSnippngConfig({
      ...mockJSON,
      editorFontSize: 54,
    });
    const mockGradAngResult = validateSnippngConfig({
      ...mockJSON,
      gradientAngle: 361,
    });
    const mockEdWidthMinResult = validateSnippngConfig({
      ...mockJSON,
      editorWidth: -10,
    });
    const mockEdWidthMaxResult = validateSnippngConfig({
      ...mockJSON,
      editorWidth: 3000,
    });
    const invalidResult = validateSnippngConfig({ ...(inValidJSON as any) });
    expect(mockOneResult).toBe("");
    expect(mockMissingKeyResult).toBe("value.selectedLang is missing");
    expect(mockInvalidKeyResult).toContain("missing");
    expect(mockBlueCheckResult).toBe(
      `bgBlur value must be in the range ${minValues.BLUR} to ${maxValues.BLUR}`
    );
    expect(mockLineHeightResult).toBe(
      `lineHeight value must be in the range ${minValues.LINE_HEIGHT} to ${maxValues.LINE_HEIGHT}`
    );
    expect(mockPadHorResult).toBe(
      `paddingHorizontal value must be in the range ${minValues.PADDING_HORIZONTAL} to ${maxValues.PADDING_HORIZONTAL}`
    );
    expect(mockPadVerResult).toBe(
      `paddingVertical value must be in the range ${minValues.PADDING_VERTICAL} to ${maxValues.PADDING_VERTICAL}`
    );
    expect(mockFontSizeResult).toBe(
      `editorFontSize value must be in the range ${minValues.FONT_SIZE} to ${maxValues.FONT_SIZE}`
    );
    expect(mockGradAngResult).toBe(
      `gradientAngle value must be in the range ${minValues.GRADIENT_ANGLE} to ${maxValues.GRADIENT_ANGLE}`
    );
    expect(mockEdWidthMinResult).toBe(
      `editorWidth value must be in the range ${DEFAULT_WIDTHS.minWidth} to ${DEFAULT_WIDTHS.maxWidth}`
    );
    expect(mockEdWidthMaxResult).toBe(
      `editorWidth value must be in the range ${DEFAULT_WIDTHS.minWidth} to ${DEFAULT_WIDTHS.maxWidth}`
    );
    expect(invalidResult).toBeTruthy();
  });
});
