import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import Navbar from "../app/components/Navbar";
import Selector from "../app/components/Selector";
import Gallery from "../app/components/Gallery";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders page navbar", () => {
    render(<Navbar />);
    const heading = screen.getByText(/next dog app/i);

    expect(heading).toBeInTheDocument();
  });

  it("renders empty filters", () => {
    render(
      <>
        <Selector
          label="Choose a breed"
          data={[]}
          handleOnChange={() => console.log("")}
        />
        <Selector
          label="Choose a sub breed"
          data={[]}
          handleOnChange={() => console.log("")}
        />
        <Selector
          label="Your choices"
          data={[]}
          handleOnChange={() => console.log("")}
        />
      </>
    );
    expect(screen.getByText(/choose a breed/i)).toBeInTheDocument();
    expect(screen.getByText(/choose a sub breed/i)).toBeInTheDocument();
    expect(screen.getByText(/your choices/i)).toBeInTheDocument();
  });

  it("renders data in breed filter", () => {
    const breeds = ["australian"];
    render(
      <Selector
        label="Choose a breed"
        data={breeds}
        handleOnChange={() => console.log("")}
      />
    );
    expect(screen.getByText(/australian/i)).toBeInTheDocument();
  });

  it("renders data in sub breed filter", () => {
    const subBreeds = ["kelpie", "shepherd"];
    render(
      <Selector
        label="Choose a sub breed"
        data={subBreeds}
        handleOnChange={() => console.log("")}
      />
    );
    expect(screen.getByText(/kelpie/i)).toBeInTheDocument();
  });

  it("renders empty gallery", () => {
    render(<Gallery dogImages={[]} />);
    expect(screen.getByText(/add any selection/i)).toBeInTheDocument();
  });
  it("renders items in gallery", () => {
    render(
      <Gallery
        dogImages={[
          "https://images.dog.ceo/breeds/affenpinscher/n02110627_11365.jpg",
        ]}
      />
    );
    expect(screen.getByText(/affenpinscher/i)).toBeInTheDocument();
  });
});
