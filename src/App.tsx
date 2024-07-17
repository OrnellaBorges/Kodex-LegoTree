import { useEffect, useState } from "react";
import { useGetSets } from "./hooks/useGetSets";
import { useGetLegoParts } from "./hooks/useGetLegoParts";
import CsvLoader from "./components/CsvLoader";
import LegoTree from "./components/Tree/LegoTree";
import { DataToParseType } from "./types/csvType";
import "./App.css";
import Tree from "./components/NewTree/Tree";

import Sets from "./components/NewTree/Sets";

function App() {
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([]);
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [csvLoaded, setCsvLoaded] = useState<boolean>(false);

  const { isLoading, legoSets, setDatas, handleIncrement } = useGetSets();
  const { partsOfLegoSets, handleNextPartsClick } = useGetLegoParts(
    selectedSetIds,
    datasToParse
  );

  useEffect(() => {
    console.log("App component loaded");
    console.log("legoSets", legoSets);
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

  /*  const handleSetClick = (setId: string) => {
    setSelectedSetIds((prev) => {
      if (prev.includes(setId)) {
        return prev.filter((id) => id !== setId);
      } else {
        return [...prev, setId];
      }
    });
  }; */

  return (
    <div className="App">
      <header className="header">
        <CsvLoader setDatasToParse={setDatasToParse} />
      </header>
      {/* {csvLoaded && (
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
      )} */}

      <Tree>
        <Sets
          legoSets={legoSets.sets}
          actionClick={handleIncrement}
          setSelectedSetIds={setSelectedSetIds}
        />
      </Tree>
    </div>
  );
}

export default App;
