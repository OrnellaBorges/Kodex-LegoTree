import "./App.css";
import CsvLoader from "./components/CsvLoader";
import { useHook } from "./hooks/useHook";
import LegoTree from "./components/Tree/LegoTree";
//import { useCsvParser } from "./hooks/useCsvData";
import { mockSetsWithParts } from "./mocks/mockSets";

function App() {
  //HOOK
  const { setDatasToParse, isLoading } = useHook();

  //console.log("APP", parsedData);

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {!isLoading && <LegoTree data={mockSetsWithParts} />}
      {/* {!isLoading && <LegoTree data={parsedData} />} */}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
