import "./App.css";
import CsvLoader from "./components/CsvLoader";
import { useHook } from "./hooks/useHook";
//import LegoSetsViewer from "./components/Tree/LegoSetsViewer";
//import { useCsvParser } from "./hooks/useCsvData";

function App() {
  //HOOK
  const { setDatasToParse } = useHook();

  //console.log("APP", parsedData);

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {/* <LegoSetsViewer parsedData={parsedData} /> */}
    </div>
  );
}

export default App;
