import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";

import useTypewriter, { DELAY_IN_SECONDS } from "./useTypewriter";

jest.useFakeTimers();

describe("useTypewriter", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should return an empty array if no text is passed", async () => {
    const { result } = renderHook(() => useTypewriter("Hello"));

    await waitFor(async () => {
      await expect(result.current).toEqual([]);
    });
  });

  test("should return an array with 3 letters if 1.5 seconds has passed", async () => {
    const { result } = renderHook(() => useTypewriter("Hello"));
    const lettersToDisplay = 3;
    const delayInMs = DELAY_IN_SECONDS * 1000 * lettersToDisplay;

    act(() => jest.advanceTimersByTime(delayInMs));

    await waitFor(async () => {
      await expect(result.current).toEqual(["H", "e", "l"]);
    });
  });
});
