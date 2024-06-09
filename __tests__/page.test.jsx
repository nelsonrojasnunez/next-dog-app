import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import Navbar from "../app/components/Navbar";
import Filters from "../app/components/Filters";
import Gallery from "../app/components/Gallery";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it("renders page navbar", () => {
    render(<Navbar />);
    const heading = screen.getByText(/next dog app/i);

    expect(heading).toBeInTheDocument();
  });

  it("renders empty filters", () => {
    render(
      <Filters breedList={[]} handleLoadDogsImages={() => console.log("")} />
    );
    expect(screen.getByText(/choose a breed/i)).toBeInTheDocument();
    expect(screen.getByText(/choose a sub breed/i)).toBeInTheDocument();
    expect(screen.getByText(/your selections/i)).toBeInTheDocument();
  });

  it("renders data in breed filter", () => {
    const breeds = [{ australian: ["kelpie", "shepherd"] }];
    render(
      <Filters
        breedList={breeds}
        handleLoadDogsImages={() => console.log("")}
      />
    );
    expect(screen.getByRole("option", "australian").selected).toBe(true);
  });

  it("renders data in sub breed filter", () => {
    const breeds = [{ australian: ["kelpie", "shepherd"] }];
    render(
      <Filters
        breedList={breeds}
        handleLoadDogsImages={() => console.log("")}
      />
    );

    expect(screen.getByRole("option", "kelpie").selected).toBe(true);
  });

  it("renders breed filter no subbreeds", () => {
    const breeds = [{ australian: [] }];
    render(
      <Filters
        breedList={breeds}
        handleLoadDogsImages={() => console.log("")}
      />
    );
    const option = screen.getByRole("option", "kelpie");

    expect(option === undefined);
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
