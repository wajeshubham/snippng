import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useMemo } from "react";
import {
  clamp,
  getHueCoordinates,
  getSaturationCoordinates,
  hsvToRgb,
  parseColor,
  rgbToHex,
} from "../utils";
import { FreeSelector, GradientSelect } from "./variants";

interface Props {
  color: string;
  gradientColors: string[];
  onChange: (color: string) => void;
  onGradientSelect: (color: string) => void;
  onGradientUnSelect: (color: string) => void;
  children: React.ReactNode;
}

export const ColorPicker: React.FC<Props> = ({
  color,
  gradientColors,
  onGradientSelect,
  onGradientUnSelect,
  onChange,
  children,
}) => {
  const parsedColor = useMemo(() => parseColor(color), [color]);
  const satCoords = useMemo(
    () => getSaturationCoordinates(parsedColor),
    [parsedColor]
  );
  const hueCoords = useMemo(
    () => getHueCoordinates(parsedColor),
    [parsedColor]
  );

  const handleHexChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      var val = event.target.value;
      if (val?.slice(0, 1) !== "#") {
        val = "#" + val;
      }
      onChange(val);
    },
    [onChange]
  );

  const handleRgbChange = useCallback(
    (component: string, value: string) => {
      const { r, g, b } = parsedColor.rgb;

      switch (component) {
        case "r":
          onChange(rgbToHex({ r: +value ?? 0, g, b }));
          return;
        case "g":
          onChange(rgbToHex({ r, g: +value ?? 0, b }));
          return;
        case "b":
          onChange(rgbToHex({ r, g, b: +value ?? 0 }));
          return;
        default:
          return;
      }
    },
    [parsedColor, onChange]
  );

  const handleSaturationChange = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // @ts-ignore
      const { width, height, left, top } = event.target.getBoundingClientRect();

      const x = clamp(event.clientX - left, 0, width);
      const y = clamp(event.clientY - top, 0, height);

      const s = (x / width) * 100;
      const v = 100 - (y / height) * 100;

      const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v });

      onChange(rgbToHex(rgb));
    },
    [parsedColor, onChange]
  );

  const handleHueChange = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // @ts-ignore
      const { width, left } = event.target.getBoundingClientRect();
      const x = clamp(event.clientX - left, 0, width);
      const h = Math.round((x / width) * 360);

      const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v };
      const rgb = hsvToRgb(hsv);

      onChange(rgbToHex(rgb));
    },
    [parsedColor, onChange]
  );

  return (
    <Menu as="div" className="relative flex flex-auto">
      <input
        className="h-0 w-0 p-0 m-0 absolute"
        data-note="input-to-test-color-picker-and-wrapperBg"
        style={{
          visibility: "hidden",
        }}
        id="color-picker"
        type={"color"}
        defaultValue={color}
      />
      <Menu.Button as="div">{children}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-30 top-full mt-2 origin-top-right divide-y-[1px] dark:divide-zinc-400 divide-zinc-300 dark:bg-black bg-white max-h-max overflow-auto text-sm rounded-sm outline outline-[1px] dark:outline-zinc-400 outline-zinc-300 dark:dark:text-white text-zinc-900 text-zinc-900">
          <FreeSelector
            parsedColor={parsedColor}
            satCoords={satCoords}
            hueCoords={hueCoords}
            onSaturationChange={handleSaturationChange}
            onHueChange={handleHueChange}
          />

          <div className="flex justify-between p-3 flex-col">
            <div
              className="rounded-full h-10 w-10 border-2 dark:border-white border-zinc-400"
              style={{
                background: color,
              }}
            />
            <div className="w-full mt-2">
              <div className="w-full">
                <label
                  className="text-sm my-0.5 dark:text-white text-zinc-900"
                  htmlFor="cp-input-hex"
                >
                  Hex
                </label>
                <input
                  className="w-full dark:bg-zinc-600 block px-2 py-1.5 bg-zinc-200 dark:border-none border-[1px] border-zinc-300 dark:text-white text-zinc-900 outline-none rounded-sm"
                  id="cp-input-hex"
                  placeholder="Hex"
                  value={parsedColor?.hex}
                  onChange={handleHexChange}
                />
              </div>
            </div>

            <div className="w-full flex justify-start gap-2 mt-3">
              <div>
                <label
                  className="text-sm my-0.5 dark:text-white text-zinc-900"
                  htmlFor="cp-input-r"
                >
                  R
                </label>
                <input
                  id="cp-input-r"
                  placeholder="R"
                  className="w-14 dark:bg-zinc-600 block px-2 py-1.5 bg-zinc-200 dark:border-none border-[1px] border-zinc-300 dark:text-white text-zinc-900 outline-none rounded-sm"
                  value={parsedColor.rgb.r}
                  onChange={(event) => handleRgbChange("r", event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <div>
                <label
                  className="text-sm my-0.5 dark:text-white text-zinc-900"
                  htmlFor="cp-input-g"
                >
                  G
                </label>
                <input
                  id="cp-input-g"
                  placeholder="G"
                  className="w-14 dark:bg-zinc-600 block px-2 py-1.5 bg-zinc-200 dark:border-none border-[1px] border-zinc-300 dark:text-white text-zinc-900 outline-none rounded-sm"
                  value={parsedColor.rgb.g}
                  onChange={(event) => handleRgbChange("g", event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <div>
                <label
                  className="text-sm my-0.5 dark:text-white text-zinc-900"
                  htmlFor="cp-input-b"
                >
                  B
                </label>
                <input
                  id="cp-input-b"
                  placeholder="B"
                  className="w-14 dark:bg-zinc-600 block px-2 py-1.5 bg-zinc-200 dark:border-none border-[1px] border-zinc-300 dark:text-white text-zinc-900 outline-none rounded-sm"
                  value={parsedColor.rgb.b}
                  onChange={(event) => handleRgbChange("b", event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
            </div>
            <GradientSelect
              selectedColors={gradientColors}
              onSelect={onGradientSelect}
              onUnSelect={onGradientUnSelect}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
