import "@testing-library/jest-dom";

jest.mock("@auth0/nextjs-auth0", () => ({
  useUser: () => ({ user: null, error: undefined, isLoading: false }),
}));

import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home Page", () => {
  it("renders a heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
  });
});
