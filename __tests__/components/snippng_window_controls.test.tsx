import { SnippngWindowControls } from "@/components";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("SnippngWindowControls", () => {
  it("renders the editor window with left aligned mac controls", async () => {
    await act(async () => {
      render(<SnippngWindowControls type="mac-left" />);
    });
    await waitFor(() => {
      screen.getByTestId("mac-left");
    });
  });

  it("renders the editor window with right aligned mac controls", async () => {
    await act(async () => {
      render(<SnippngWindowControls type="mac-right" />);
    });
    await waitFor(() => {
      screen.getByTestId("mac-right");
    });
  });

  it("renders the editor window with left aligned window controls", async () => {
    await act(async () => {
      render(<SnippngWindowControls type="windows-left" />);
    });
    await waitFor(() => {
      screen.getByTestId("windows-left");
    });
  });

  it("renders the editor window with right aligned window controls", async () => {
    await act(async () => {
      render(<SnippngWindowControls type="windows-right" />);
    });
    await waitFor(() => {
      screen.getByTestId("windows-right");
    });
  });
});
