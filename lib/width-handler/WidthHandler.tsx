import React, { RefObject, useEffect, useRef } from "react";
import { DEFAULT_WIDTHS } from "../constants";

interface Props {
  innerRef: RefObject<HTMLDivElement>;
  onChange: (width: number) => void;
}

const edgeCase = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

const WidthHandler: React.FC<Props> = ({ innerRef, onChange }) => {
  const { minWidth, maxWidth } = DEFAULT_WIDTHS;

  const startX = useRef<number | null>(null);
  const startWidth = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!startX.current || !startWidth.current) return;
      const delta = e.pageX - startX.current; // leftOrRight === 'left' ? startX - e.pageX : (startX - e.pageX) * -1
      const calculated = startWidth.current + delta * window.devicePixelRatio;
      const newWidth = edgeCase(calculated, minWidth, maxWidth);
      onChange(newWidth);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [innerRef, maxWidth, minWidth, onChange]);

  useEffect(() => {
    const handleMouseUp = () => {
      startX.current = null;
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      onMouseDown={(e) => {
        startX.current = e.pageX;
        startWidth.current = innerRef.current
          ? innerRef.current.clientWidth
          : 0;
      }}
      role="separator"
      aria-orientation="vertical"
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      className="w-2 h-full z-20 flex bg-sky-500 hover:opacity-50 opacity-0 top-0 right-0 cursor-ew-resize absolute"
    ></div>
  );
};

export default WidthHandler;
