import "./App.css";

import CsvLoader from "./components/CsvLoader";
import LegoSetsViewer from "./components/Tree/LegoSetsViewer";
import { useCsvParser } from "./hooks/useCsvParser";

function App() {
  const { parsedData } = useCsvParser();

  console.log("KKKKKK", parsedData);

  console.log("sets", parsedData.sets);
  return (
    <div className="App">
      <header className="header">
        <CsvLoader />
      </header>
      <LegoSetsViewer parsedDatas={parsedData} />
    </div>
  );
}

export default App;
