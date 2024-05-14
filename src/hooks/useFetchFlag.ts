import { useEffect, useState } from "react";

// FLAG_URL was found using the following code
// Array.from(document.querySelectorAll("code[data-class^='23'] > div[data-tag$='93'] > span[data-id*='21'] > i.char")).map(node => node.getAttribute('value')).join('');

enum Status {
  Loading = "loading",
  Error = "error",
  Ready = "ready",
}

const HTTP_STATUS_OK = 200;
const FLAG_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/68616e";

export default function useFetchFlag() {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [flag, setFlag] = useState<string>();

  async function fetchFlag() {
    setStatus(Status.Loading);

    try {
      const response = await fetch(FLAG_URL);
      const flag = await response.text();

      if (response.status !== HTTP_STATUS_OK)
        throw new Error("Error fetching flag");

      setStatus(Status.Ready);
      setFlag(flag);
    } catch (e) {
      setStatus(Status.Error);
    }
  }

  useEffect(() => {
    fetchFlag();
  }, []);

  return {
    loading: status === Status.Loading,
    error: status === Status.Error,
    flag: status === Status.Ready ? flag : undefined,
  };
}
