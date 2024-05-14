import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import App from "./App";
import useFetchFlag from "./hooks/useFetchFlag";
import useTypewriter from "./hooks/useTypewriter";

jest.mock("./hooks/useFetchFlag");
jest.mock("./hooks/useTypewriter");

describe("App", () => {
  beforeEach(() => {
    (useFetchFlag as jest.Mock).mockReturnValue({
      flag: "hello world",
      loading: false,
      error: false,
    });

    (useTypewriter as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading message", () => {
    (useFetchFlag as jest.Mock).mockReturnValue({
      flag: "hello world",
      loading: true,
      error: false,
    });

    const screen = render(<App />);
    const loadingMessage = screen.getByText(/loading/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders error message", () => {
    (useFetchFlag as jest.Mock).mockReturnValue({
      flag: "hello world",
      loading: false,
      error: true,
    });

    const screen = render(<App />);
    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders typewriter message", () => {
    const typewriterValue = "hello world";
    (useTypewriter as jest.Mock).mockReturnValue(typewriterValue.split(""));

    const screen = render(<App />);
    const typewriterMessage = screen.getByText((_, element) => {
      const hasText = element?.textContent === typewriterValue;
      const childrenMatches =
        element?.children?.length === typewriterValue.length;
      return hasText && childrenMatches;
    });
    expect(typewriterMessage).toBeInTheDocument();
  });
});
