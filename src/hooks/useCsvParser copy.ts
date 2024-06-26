import { useState, useEffect } from "react";
import { lineParser } from "../utils/parser";

type CSVDataType = {
  [key: string]: string | number;
};

export function useCsvParser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [parsedCsvDatas, setParsedCsvData] = useState<CSVDataType[] | null>(
    null
  );

  //RECU DU COMPOSANT
  //const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [datasToParse, setDatasToParse] = useState<{ [key: string]: string[] }>(
    {}
  );
  console.log("datasToParse", datasToParse);

  // fonction qui convertit les tableau string csv => en tableau d'objets
  const parseCsv = (dirtyCsvArray: string[]): CSVDataType[] => {
    console.log("JE PARSE !");

    const datasParsed: CSVDataType[] = [];

    for (let i = 0; i < dirtyCsvArray.length; i++) {
      let text = dirtyCsvArray[i];
      const [keyRow, ...rows] = text.trim().split("\n");
      console.log("keyRow", keyRow); // string
      console.log("rows", rows); // un tableau

      const keysArray = keyRow.split(",").map((element) => element.trim());
      console.log("keysArray", keysArray); // ['part_number', 'name', 'category']

      // Limiter
      const limitedRows = rows.slice(0, 20);

      const cleanedRows = lineParser(limitedRows, keysArray.length);
      //console.log("cleanedRows", cleanedRows);

      const parsedRows = cleanedRows.map((row) => {
        console.log("inner MAP");

        // Créer l'objet CSVDataType en utilisant keys et columns
        return keysArray.reduce((obj, key, index) => {
          obj[key] = row[index];
          return obj;
        }, {} as CSVDataType);
        // initial value est {objet vide}
      });
      console.log("parsedRows", parsedRows);
      datasParsed.push(...parsedRows);
    }

    return datasParsed;
  };

  useEffect(() => {
    console.log("UE-> je dois parser la data ");
    const valueToParse = Object.values(datasToParse);
    console.log("valueToParse", valueToParse);

    const parsedDatas = parseCsv(valueToParse[0]);
    console.log("parsedDatas", parsedDatas);
  }, [datasToParse]);

  return {
    isLoading,
    isError,
    parsedCsvDatas,
    parseCsv,
    setDatasToParse,
  };
}
