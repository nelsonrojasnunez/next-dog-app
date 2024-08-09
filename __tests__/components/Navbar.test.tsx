import Navbar from "@/app/components/Navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  it("should render heading in the navbar", () => {
    render(<Navbar />);
    const heading = screen.getByText(/next dog app/i);

    expect(heading).toBeInTheDocument();
  });
});
