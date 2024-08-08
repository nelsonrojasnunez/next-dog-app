import "@testing-library/jest-dom";
import { render, screen, renderHook, act } from "@testing-library/react";
//import { http } from "msw";
//import { setupServer } from "msw/node";

import userEvent from "@testing-library/user-event";
import Page from "../app/page";
import Selector from "../app/components/Selector";
import Loading from "../app/components/Loading";
import Filters from "../app/components/Filters";
import useBreeds from "@/app/hooks/useBreeds";

/*const server = setupServer(
  http.get("/greeting", () => {
    return res(ctx.json({ greeting: "hello there" }));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
*/

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("should call custom hook and unmount component to check if abort is called", () => {
    const { result, unmount } = renderHook(useBreeds);
    //unmount();
    //expect(result.current.breeds).toHaveLength(0);
  });

  it("should render Home Page, unmount it and checks for ControllerAbort call", () => {
    const { unmount } = render(<Page />);
    const loadingText = screen.queryByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
    unmount();
    expect(loadingText).not.toBeInTheDocument();
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

  it("should render the loading text", () => {
    render(<Loading />);
    expect(screen.getByText(/wait/i)).toBeInTheDocument();
  });

  it("should add an element to the list when user selects one", async () => {
    //arrange
    const breeds = ["australian"];

    render(
      <Filters
        breedList={breeds}
        handleLoadDogsImages={() => {}}
        handleSetLoading={() => {}}
      />
    );

    //act
    //const user = userEvent.setup();
    //await user.click();
    //assert
  });
});
