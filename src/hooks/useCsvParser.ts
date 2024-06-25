import { useState, useEffect } from "react";
import { stringParser, stringParserV2 } from "../utils/stringParser";

type CSVDataType = {
  [key: string]: string | number;
};

export function useCsvParser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [parsedCsvDatas, setParsedCsvData] = useState<CSVDataType[] | null>(
    null
  );

  // fonction qui converti les csv en tableau d'objet
  const parseCsv = (csvContentTest: string): CSVDataType[] => {
    const [keyRow, ...rows] = csvContentTest.trim().split("\n");
    console.log("keyRow", keyRow); // string ???
    console.log("rows", rows); // un tableau

    const keysArray = keyRow.split(",").map((element) => element.trim());
    console.log("keysArray", keysArray); // ['part_number', 'name', 'category']

    // Limiter
    /* const limitedRows = rows.slice(0, 50);
    console.log("limited", limitedRows.length); */

    const cleanedRows = stringParser(rows);
    console.log("cleanedRows", cleanedRows);

    return cleanedRows.map((row) => {
      let columns: string[] = [];

      // Créer l'objet CSVDataType en utilisant keys et columns
      return keysArray.reduce((obj, key, index) => {
        obj[key] = columns[index];
        return obj;
      }, {} as CSVDataType);
    });
  };

  //useEffect(() => {}, []);

  return {
    isLoading,
    isError,
    parsedCsvDatas,
    parseCsv,
  };
}
