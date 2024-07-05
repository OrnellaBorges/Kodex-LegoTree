import { useEffect, useState } from "react";

import { useHook } from "./hooks/useHook";
import { useGetLegoParts } from "./hooks/useGetLegoParts";

import CsvLoader from "./components/CsvLoader";
import LegoTree from "./components/Tree/LegoTree";
import "./App.css";
import { DataToParseType } from "./types/csvType";

function App() {
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([]);
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [csvLoaded, setCsvLoaded] = useState<boolean>(false);

  //HOOK
  const { isLoading, legoSets, setDatas } = useHook();

  const { partsOfLegoSet } = useGetLegoParts(selectedSetIds, datasToParse);

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

    // envoyer sets dans le useHook
    const setsDatas = datasToParse.filter((el) => el.fileName === "sets");
    console.log("setsDatas", setsDatas);

    setDatas(setsDatas);
    /*  //Retirer "sets" de datasToParse pour eviter un traitement inutile
    setDatasToParse((prevData) =>
      prevData.filter((data) => data.fileName !== "sets")
    ); */
  }, [datasToParse]);

  const handleSetClick = (setId: string) => {
    setSelectedSetIds((prev) => {
      //Verifier la présence de l'id dans le tableau
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
          parts={partsOfLegoSet ? partsOfLegoSet : []}
          onClick={handleSetClick}
        />
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
