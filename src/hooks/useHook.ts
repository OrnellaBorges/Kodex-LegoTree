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
};

export function useHook() {
  const [datas, setDatas] = useState<DataToParseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [legoSets, setLegoSets] = useState<LegoSets>({
    sets: [],
  });

  const [limitParse, setlimitParse] = useState<number>(3);
  const [parsedCount, setParsedCount] = useState<number>(0);

  const parseSets = async (start: number, limit: number) => {
    console.log("PAAAARSE");

    console.log("start", start, "limit", limit);
    setIsLoading(true);
    try {
      const setsData = datas.find((data) => data.fileName === "sets");
      if (setsData) {
        const { content } = setsData;
        const { keysArray: setsKeysArray, rows: setsRows } =
          extractKeysAndRows(content);
        const rowsToparse = setsRows.slice(start, start + limit);
        console.log("rowsToparse", rowsToparse);
        const parsedLegoSets = cleanCsvContent(
          setsKeysArray,
          rowsToparse
        ) as Set[];
        setLegoSets((prevSets) => ({
          ...prevSets,
          sets: [...prevSets.sets, ...parsedLegoSets],
        }));
      }
    } catch (error) {
      console.error("Erreur lors du parsing des fichiers CSV :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (datas.length === 0) {
      console.log("Pas de parsing");
      return;
    }
    parseSets(parsedCount, limitParse);
  }, [datas]);

  useEffect(() => {
    if (parsedCount === 0) return;
    console.log("parsedCount", parsedCount);
    parseSets(parsedCount, limitParse);
  }, [parsedCount]);

  const handleIncrement = () => {
    console.log("parsedCount", parsedCount);
    const newParsedCount = parsedCount + limitParse;
    console.log("newParsedCount", newParsedCount);
    setParsedCount(newParsedCount);
  };

  return {
    isLoading,
    setDatas,
    legoSets,
    handleIncrement,
  };
}
