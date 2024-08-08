import Filters from "@/app/components/Filters";
import { render, screen } from "@testing-library/react";

describe("Filters", () => {
  it("should render empty filters", () => {
    //Arrange
    const breeds: string[] = [];
    const setDogImages = () => {};
    const setIsLoading = () => {};

    render(
      <Filters
        breedList={breeds}
        handleLoadDogsImages={setDogImages}
        handleSetLoading={setIsLoading}
      ></Filters>
    );

    //Act

    //Assert
    //screen.debug();
    const options = screen.queryAllByRole("option");
    //2 elements are empty options for default value "choose breed" and "choose sub-breed"
    expect(options).toHaveLength(2);
  });
});
