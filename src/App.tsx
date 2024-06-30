import "./App.css";
import CsvLoader from "./components/CsvLoader";
import { useHook } from "./hooks/useHook";
import LegoTree from "./components/Tree/LegoTree";
//import { useCsvParser } from "./hooks/useCsvData";
import { mockSetsWithParts, mockSets } from "./mocks/mockSets";
import { useEffect } from "react";

function App() {
  //HOOK
  const { setDatasToParse, isLoading, legoData, handleSetClick } = useHook();

  useEffect(() => {
    console.log("App component loaded");
  }, []);

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {legoData && <LegoTree data={legoData} onClick={handleSetClick} />}

      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
