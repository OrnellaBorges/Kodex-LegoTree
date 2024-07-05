import { useEffect, useState } from "react";

import { useHook } from "./hooks/useHook";

import CsvLoader from "./components/CsvLoader";
import LegoTree from "./components/Tree/LegoTree";
import "./App.css";

function App() {
  //HOOK
  const {
    setDatasToParse,
    isLoading,
    setSelectedSetIds,
    legoData,
    handleSetClick,
    partsOfLegoSet,
  } = useHook();

  const [csvLoaded, setCsvLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log("App component loaded");
  }, []);

  useEffect(() => {
    if (legoData.sets.length > 0) {
      setCsvLoaded(true);
    }
  }, [legoData]);

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {csvLoaded && (
        <LegoTree
          legoSets={legoData}
          parts={partsOfLegoSet ? partsOfLegoSet : []}
          onClick={handleSetClick}
        />
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
