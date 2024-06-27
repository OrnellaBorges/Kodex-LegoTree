import { useState, useEffect } from "react";
import { lineParser } from "../utils/parser";

import {
  Set,
  Part,
  Inventory,
  ParsedData,
  DataToParseType,
  CSVDataType,
  ParsedData2,
} from "../types/csvType";

export function useCsvParser() {
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [parsedData, setParsedData] = useState<ParsedData2[]>([]);

  const parseCsv = (dirtytext: string): CSVDataType[] => {
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

  /* useEffect(() => {

    const keyMap: { [fileName: string]: keyof ParsedData2 } = {
      "sets.csv": "sets",
      "parts.csv": "parts",
      "Inventory.csv": "inventory",
    };



    const newParsedData: ParsedData2 = [
      { sets: [] },
      { parts: [] },
      { inventory: [] },
    ];

    datasToParse.forEach(({ fileName, content }) => {
      if (keyMap[fileName]) {
        const parsedContent = parseCsv(content);
        newParsedData[keyMap[fileName]] = [
          ...newParsedData[keyMap[fileName]],
          ...parsedContent,
        ];
      }
    });

    setParsedData(newParsedData);
  }, [datasToParse]); */

  return {
    setDatasToParse,
    parsedData,
  };
}
