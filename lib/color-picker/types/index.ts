export interface Color {
  hex: string;
  rgb: ColorRGB;
  hsv: ColorHSV;
}

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSV {
  h: number;
  s: number;
  v: number;
}
