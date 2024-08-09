import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filters from "@/app/components/Filters";
import fetchMock from "jest-fetch-mock";
import { fetchDogs } from "@/app/utils/utils";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Filters", () => {
  const breedList = ["hound", "retriever"];
  const handleLoadDogsImages = jest.fn();
  const handleSetLoading = jest.fn();

  it("should render empty filters", () => {
    //Arrange
    const setDogImages = () => {};
    const setIsLoading = () => {};

    render(
      <Filters
        breedList={[]}
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

  it("fetches and returns dog images using fetchDogs function", async () => {
    const mockData = ["dog1.jpg", "dog2.jpg"];
    fetchMock.mockResponseOnce(JSON.stringify({ message: mockData }));

    const result = await fetchDogs("hound/", 2);

    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dog.ceo/api/breed/hound/images/random/2"
    );
  });

  it("handles errors when calls fetchDogs function", async () => {
    fetchMock.mockRejectOnce(
      new Error("Network response for fetching dogs was not ok")
    );

    const result = await fetchDogs("hound", 2);

    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      new Error("Network response for fetching dogs was not ok")
    );
  });

  // it("calls onLoadDogsGallery once when 'Fetch images' button is clicked", async () => {
  //   render(
  //     <Filters
  //       breedList={breedList}
  //       handleLoadDogsImages={handleLoadDogsImages}
  //       handleSetLoading={handleSetLoading}
  //     />
  //   );

  //   // Simulate user selecting a breed and sub-breed
  //   fireEvent.change(screen.getByLabelText("Choose a Breed:"), {
  //     target: { value: "labrador" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Choose a Sub Breed:"), {
  //     target: { value: "retriever" },
  //   });

  //   // Simulate adding the selection
  //   fireEvent.click(screen.getByText("Add Selection"));

  //   // Simulate clicking the 'Fetch images' button
  //   fireEvent.click(screen.getByText("Fetch images"));

  //   // Check if handleLoadDogsImages has been called once
  //   expect(handleLoadDogsImages).toHaveBeenCalledTimes(1);
  // });
});
