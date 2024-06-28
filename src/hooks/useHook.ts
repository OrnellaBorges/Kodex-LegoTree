import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  LegoSet,
  ParsedData,
} from "../types/csvType";
import { lineParser } from "../utils/parser";

type ResultType = {
  fileName: string;
  content: CSVDataType[];
};

type NewObjType = {
  [fileName: string]: any[]; // Définir le type précis du contenu pour chaque fileName si possible
};

export function useHook() {
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<ParsedData>({
    sets: [],
    parts: [],
    inventory: [],
  });

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

  const createLegoSets = (parsedResults: ResultType[]): NewObjType => {
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
        const legoSets = createLegoSets(parsedResults);
        const { sets, parts, inventory } = legoSets;
        console.log("sets", sets);
        console.log("parts", parts);
      } catch (error) {
        console.error("Erreur lors du parsing des fichiers CSV :", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    parseData();
  }, [datasToParse]);

  return {
    isLoading,
    parsedData,
    setDatasToParse,
  };
}
