import { useEffect, useRef, useState } from "react";

export const DELAY_IN_SECONDS = 0.5;

export default function useTypewriter(text: string = "") {
  const [typewriter, setTypewriter] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  function resetTypewriter() {
    setTypewriter([]);
    clearInterval(timeoutRef.current);
  }

  function incrementTypewriter() {
    setTypewriter((currentTypewriter) => {
      const counter = currentTypewriter.length + 1;

      if (counter >= text.length) clearInterval(timeoutRef.current);

      return text.split("").slice(0, counter);
    });
  }

  useEffect(() => {
    resetTypewriter();

    timeoutRef.current = setInterval(
      incrementTypewriter,
      DELAY_IN_SECONDS * 1000
    );
    return () => clearInterval(timeoutRef.current);
  }, [text]);

  return typewriter;
}
