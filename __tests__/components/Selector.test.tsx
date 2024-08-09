import Selector from "@/app/components/Selector";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe("Selector", () => {
  it("should render selector with empty array", () => {
    const label = "Choose a breed";
    render(
      <Selector
        label={label}
        data={[]}
        handleOnChange={() => console.log("")}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });

  it("should render selector with a couple breeds", () => {
    //arrange
    const label = "Choose a breed";
    const data = ["affenpinscher", "african", "airedale"];
    const handleOnChange = jest.fn();
    render(
      <Selector label={label} data={data} handleOnChange={handleOnChange} />
    );
    const selector: HTMLSelectElement = screen.getByTestId("selector");
    //act
    fireEvent.change(selector, { target: { value: "african" } });
    //assert
    expect(selector.value).toBe("african");


    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });

  it("should select a value ", () => {});

  it('calls handleOnChange with empty string when no option is selected', () => {
    const handleOnChange = jest.fn();
    const data = ['option1', 'option2', 'option3'];
    const label = 'Test Label';

    render(<Selector data={data} label={label} handleOnChange={handleOnChange} />);

    const selectElement = screen.getByTestId('selector');
    fireEvent.change(selectElement, { target: { value: '' } });

    expect(handleOnChange).toHaveBeenCalledWith('');
  });
});
