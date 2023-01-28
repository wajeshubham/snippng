import React from "react";
import { Color } from "../../types";

interface FreeSelectorProps {
  parsedColor: Color;
  satCoords: Array<number>;
  hueCoords: number;
  onSaturationChange: React.MouseEventHandler<HTMLDivElement>;
  onHueChange: React.MouseEventHandler<HTMLDivElement>;
}

export const FreeSelector = (props: FreeSelectorProps) => {
  const { parsedColor, satCoords, hueCoords, onSaturationChange, onHueChange } =
    props;

  return (
    <div className="w-96 max-w-full mb-4 grid gap-2">
      <div
        className="cp-saturation w-full h-40 relative cursor-crosshair"
        style={{
          backgroundColor: `hsl(${parsedColor.hsv.h}, 100%, 50%)`,
        }}
        onClick={onSaturationChange}
      >
        <div
          className="w-4 h-4 border-2 border-white rounded-full absolute -translate-x-[7.5px] -translate-y-[7.5px] cursor-grab"
          style={{
            backgroundColor: parsedColor.hex,
            left: (satCoords?.[0] ?? 0) + "%",
            top: (satCoords?.[1] ?? 0) + "%",
          }}
        />
      </div>
      <div className="w-full px-3 pt-3">
        <div
          className="cp-hue w-full h-[10px] rounded-full relative cursor-crosshair"
          onClick={onHueChange}
        >
          <div
            className="w-4 h-4 border-2 dark:border-white border-zinc-400 rounded-full absolute -translate-x-[7.5px] -translate-y-[3px] cursor-grab"
            style={{
              backgroundColor: parsedColor.hex,
              left: (hueCoords ?? 0) + "%",
            }}
          />
        </div>
      </div>
    </div>
  );
};
