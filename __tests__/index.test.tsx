import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";

describe("LandingPage", () => {
  it("renders the landing page", async () => {
    render(<Home />);
    await waitFor(() => {
      screen.getByText("Hello world");
    });
  });
});
