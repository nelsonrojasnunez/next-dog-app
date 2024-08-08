import Gallery, { getBreedInfo } from "@/app/components/Gallery";
import { render, screen } from "@testing-library/react";

describe("Gallery", () => {
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
  it("should return a capitalized text from given url", () => {
    const urls = [
      "https://images.dog.ceo/breeds/african/",
      "https://images.dog.ceo/breeds/akita/",
      "https://images.dog.ceo/breeds/australian-shepherd/",
    ];
    const capitalizedExpected = ["African", "Akita", "Australian Shepherd"];

    urls.map((url, index) => {
      const breedName = getBreedInfo(url);
      const capitalized = capitalizedExpected[index];
      expect(breedName).toEqual(capitalized);
    });
  });
});
