import {
  rgbToHex,
  hexToRgb,
  getRgb,
  rgbToHsv,
  hsvToRgb,
} from "@/lib/color-picker/utils";
import { getEditorWrapperBg } from "@/utils";
import { waitFor } from "@testing-library/react";

describe("ColoPicker", () => {
  describe("Utility functions", () => {
    it("converts rgb color to hexcode color", async () => {
      const expectedHex = "#78881F".toLowerCase();
      const convertedHex = rgbToHex({ r: 120, g: 136, b: 31 }).toLowerCase();
      expect(expectedHex).toBe(convertedHex);
    });

    it("converts hexcode color to rgb color", async () => {
      const expectedRGBObject = { r: 120, g: 136, b: 31 };
      const convertedRGB = hexToRgb("#78881F");
      expect(expectedRGBObject.r).toBe(convertedRGB.r);
      expect(expectedRGBObject.g).toBe(convertedRGB.g);
      expect(expectedRGBObject.b).toBe(convertedRGB.b);
    });

    it("destructures RGB keys based on rgb string passed", async () => {
      const expectedRGBObject = { r: 120, g: 136, b: 31 };
      const convertedRGB = getRgb("rgb(120, 136, 31)");
      expect(expectedRGBObject.r).toBe(convertedRGB.r);
      expect(expectedRGBObject.g).toBe(convertedRGB.g);
      expect(expectedRGBObject.b).toBe(convertedRGB.b);
    });

    it("converts rgb color to hsv color", async () => {
      const expectedHSV = { h: 69, s: 77.2, v: 53.3 };
      const convertedHSV = rgbToHsv({ r: 120, g: 136, b: 31 });
      expect(Math.floor(expectedHSV.h)).toBe(Math.floor(convertedHSV.h));
      expect(Math.floor(expectedHSV.s)).toBe(Math.floor(convertedHSV.s));
      expect(Math.floor(expectedHSV.v)).toBe(Math.floor(convertedHSV.v));
    });

    it("converts hsv color to rgb color", async () => {
      const expectedRGB = { r: 120, g: 136, b: 31 };
      const convertedRGB = hsvToRgb({ h: 69, s: 77.2, v: 53.3 });
      expect(Math.floor(expectedRGB.r)).toBe(Math.floor(convertedRGB.r));
      expect(Math.floor(expectedRGB.g)).toBe(Math.floor(convertedRGB.g));
      expect(Math.floor(expectedRGB.b)).toBe(Math.floor(convertedRGB.b));
    });
  });

  describe("Gradients property", () => {
    it("renders wrapper with gradient equals to the gradient array", async () => {
      let renderedBackground = getEditorWrapperBg(
        "#eee811",
        ["#ba68c8", "#ffa7c4", "#e57373"],
        140
      );
      await waitFor(() => {
        expect(renderedBackground).toBe(
          `linear-gradient(140deg, #ba68c8, #ffa7c4, #e57373)`
        );
      });
    });
  });
});
