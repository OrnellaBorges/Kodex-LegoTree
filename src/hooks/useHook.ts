import { useState, useEffect } from "react";
import { CSVDataType, DataToParseType, ParsedData } from "../types/csvType";
import { lineParser } from "../utils/parser";

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
