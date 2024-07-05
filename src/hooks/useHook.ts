import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  Inventory,
  Part,
  Set,
} from "../types/csvType";

import { cleanCsvContent } from "../utils/parser";
import { extractKeysAndRows } from "../utils/utils";

type ResultType = {
  fileName: string;
  content: CSVDataType[];
};

type NewObjType = {
  [fileName: string]: any[];
};

type LegoSetType2 = {
  set_id: string;
  _name: string;
  year: number;
  theme: string;
  parts: Inventory[];
};

type LegoSetsState = {
  sets: Set[];
  parts?: Part[];
  inventory?: Inventory[];
};

type LegoSets = {
  sets: Set[];
  displayedSets: Set[];
};

export function useHook() {
  const [datas, setDatas] = useState<DataToParseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [legoSets, setLegoSets] = useState<LegoSets>({
    sets: [],
    displayedSets: [],
  });

  useEffect(() => {
    if (datas.length === 0) {
      console.log("Pas de parsing");
      return;
    }
    //console.log("datasToParse", datasToParse);
    const parseSets = async () => {
      setIsLoading(true);

      try {
        const setsData = datas.find((data) => data.fileName === "sets");

        if (setsData) {
          const { content } = setsData;
          const { keysArray: setsKeysArray, rows: setsRows } =
            extractKeysAndRows(content);

          const parsedSets = cleanCsvContent(setsKeysArray, setsRows) as Set[];

          setLegoSets((prevSets) => ({
            ...prevSets,
            sets: parsedSets,
          }));
        }
      } catch (error) {
        console.error("Erreur lors du parsing des fichiers CSV :", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    parseSets();
  }, [datas]);

  return {
    isLoading,
    setDatas,
    legoSets,
  };
}
