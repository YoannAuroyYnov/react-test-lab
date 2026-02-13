import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("check counter on click me button", () => {
  render(<App />);

  const buttonElement = screen.getByText(/click me/i);
  const counterElement = screen.getByTestId("count");
  expect(counterElement).toHaveTextContent("0");

  fireEvent.click(buttonElement);
  expect(counterElement).toHaveTextContent("1");
});
