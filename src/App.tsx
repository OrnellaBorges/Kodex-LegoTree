import "./App.css";
import CsvLoader from "./components/CsvLoader";
import { useHook } from "./hooks/useHook";
import LegoTree from "./components/Tree/LegoTree";
//import { useCsvParser } from "./hooks/useCsvData";

function App() {
  //HOOK
  const { setDatasToParse, parsedData, isLoading } = useHook();

  //console.log("APP", parsedData);

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {!isLoading && <LegoTree parsedData={parsedData} />}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
