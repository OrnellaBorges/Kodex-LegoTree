import { useEffect, useState } from "react";
import { useHook } from "./hooks/useHook";
import { useGetLegoParts } from "./hooks/useGetLegoParts";
import CsvLoader from "./components/CsvLoader";
import LegoTree from "./components/Tree/LegoTree";
import { DataToParseType } from "./types/csvType";
import "./App.css";

function App() {
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([]);
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [csvLoaded, setCsvLoaded] = useState<boolean>(false);

  const { isLoading, legoSets, setDatas, handleIncrement } = useHook();
  const { partsOfLegoSets } = useGetLegoParts(selectedSetIds, datasToParse);

  useEffect(() => {
    console.log("App component loaded");
  }, []);

  useEffect(() => {
    if (legoSets.sets.length > 0) {
      setCsvLoaded(true);
    }
  }, [legoSets]);

  useEffect(() => {
    console.log("datasToParse", datasToParse);
    const setsDatas = datasToParse.filter((el) => el.fileName === "sets");
    console.log("setsDatas", setsDatas);
    setDatas(setsDatas);
  }, [datasToParse, setDatas]);

  const handleSetClick = (setId: string) => {
    setSelectedSetIds((prev) => {
      if (prev.includes(setId)) {
        return prev.filter((id) => id !== setId);
      } else {
        return [...prev, setId];
      }
    });
  };

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {csvLoaded && (
        <LegoTree
          legoSets={legoSets}
          selectedSet={selectedSetIds}
          parts={partsOfLegoSets ? partsOfLegoSets : []}
          onClick={handleSetClick}
        />
      )}
      {legoSets.sets.length > 0 && (
        <button onClick={handleIncrement}>Next Sets</button>
      )}
      {isLoading && (
        <div>Loading...converting sets please wait a few moments</div>
      )}
    </div>
  );
}

export default App;
