import useFetchFlag from "./hooks/useFetchFlag";
import useTypewriter from "./hooks/useTypewriter";

export default function App() {
  const { flag, loading, error } = useFetchFlag();
  const typewriter = useTypewriter(flag);

  return (
    <div>
      {loading && <div>loading...</div>}
      {error && <div>error</div>}
      {typewriter.length > 0 && (
        <ul>
          {typewriter.map((letter, index) => (
            <li key={index}>{letter}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
