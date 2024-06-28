import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  Inventory,
  LegoSet,
  ParsedData,
  Part,
  Set,
} from "../types/csvType";
import { lineParser } from "../utils/parser";

type ResultType = {
  fileName: string;
  content: CSVDataType[];
};

type NewObjType = {
  [fileName: string]: any[];
};

export function useHook() {
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [legoSets, setLegoSets] = useState<Set[]>([]);
  const [legoParts, setLegoParts] = useState<Part[]>([]);
  const [legoInventory, setLegoInventory] = useState<Part[]>([]);

  const parseContent = (dirtytext: string): CSVDataType[] => {
    const [keyRow, ...rows] = dirtytext.trim().split("\n");
    const keysArray = keyRow.split(",").map((element) => element.trim());
    const limitedRows = rows.slice(0, 20);
    const cleanedRows = lineParser(limitedRows, keysArray.length);

    return cleanedRows.map((row) => {
      return keysArray.reduce((obj, key, index) => {
        obj[key] = row[index];
        return obj;
      }, {} as CSVDataType);
    });
  };

  const transformParsedResult = (parsedResults: ResultType[]): NewObjType => {
    const newObj: NewObjType = {};

    parsedResults.forEach((result) => {
      newObj[result.fileName] = result.content;
      console.log("newObj", newObj);
    });
    return newObj;
  };

  useEffect(() => {
    if (datasToParse.length > 0) {
      console.log("datasToParse Tableau d'ojet", datasToParse);
    }
    const parseData = async () => {
      setIsLoading(true);

      try {
        const parsedResults = datasToParse.map((el) => {
          const parsedContent = parseContent(el.content);
          const fileNameToKey = el.fileName.replace(".csv", "").toLowerCase();
          console.log("fileNameToKey", fileNameToKey);
          console.log("parsedContent", parsedContent);
          return {
            fileName: fileNameToKey,
            content: parsedContent,
          };
        });

        console.log("parsedResults", parsedResults);

        // Créer la structure combinée des ensembles LEGO avec les pièces
        const transformedResult = transformParsedResult(parsedResults);
        const { sets, parts, inventory } = transformedResult;
        setLegoSets(sets);
        setLegoParts(parts);
        setLegoInventory(inventory);
      } catch (error) {
        console.error("Erreur lors du parsing des fichiers CSV :", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    parseData();
  }, [datasToParse]);

  console.log("legoSets", legoSets);

  return {
    isLoading,
    setDatasToParse,
  };
}
