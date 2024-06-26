import { useState, useEffect } from "react";
import { lineParser } from "../utils/parser";

import { Set, Part, Inventory } from "../types/csvType";

type CSVDataType = {
  [key: string]: string | number;
};

type DataToParseType = {
  fileName: string;
  content: string;
};

// Définir un type global pour parsedData
type ParsedData = {
  sets: Set[];
  parts: Part[];
  inventory: Inventory[];
};
export function useCsvParser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  /*  const [parsedCsvDatas, setParsedCsvData] = useState<CSVDataType[] | null>(
    null
  ); */

  const [parsedData, setParsedData] = useState<ParsedData>({
    sets: [],
    parts: [],
    inventory: [],
  });

  //RECU DU COMPOSANT
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  /*  const [datasToParse, setDatasToParse] = useState<{ [key: string]: string[] }>(
    {}
  ); */
  console.log("datasToParse", datasToParse);

  // fonction qui convertit les tableau string csv => en tableau d'objets
  const parseCsv = (dirtytext: string): CSVDataType[] => {
    console.log("JE PARSE !");

    const datasParsed: CSVDataType[] = [];

    const [keyRow, ...rows] = dirtytext.trim().split("\n");
    console.log("keyRow", keyRow); // string
    console.log("rows", rows); // un tableau

    const keysArray = keyRow.split(",").map((element) => element.trim());
    console.log("keysArray", keysArray); // ['part_number', 'name', 'category']

    // Limiter
    const limitedRows = rows.slice(0, 20);

    const cleanedRows = lineParser(limitedRows, keysArray.length);
    //console.log("cleanedRows", cleanedRows);

    return cleanedRows.map((row) => {
      console.log("inner MAP");

      // Créer l'objet CSVDataType en utilisant keys et columns
      return keysArray.reduce((obj, key, index) => {
        obj[key] = row[index];
        return obj;
      }, {} as CSVDataType);
      // initial value est {objet vide}
    });
  };

  useEffect(() => {
    const keyMap: { [fileName: string]: keyof ParsedData } = {
      "sets.csv": "sets",
      "parts.csv": "parts",
      "Inventory.csv": "inventory",
      // Ajoutez d'autres correspondances au besoin
    };

    // Fonction pour parser le contenu CSV en fonction du type de fichier
    const parseCsvContent = (fileName: string, content: string): any[] => {
      switch (fileName) {
        case "sets.csv":
          return parseCsv(content);
        case "parts.csv":
          return parseCsv(content);
        case "Inventory.csv":
          return parseCsv(content);
        default:
          return [];
      }
    };

    // Réinitialiser parsedData
    const newParsedData: ParsedData = {
      sets: [],
      parts: [],
      inventory: [],
    };

    // Parcourir datasToParse et mettre à jour parsedData
    datasToParse.forEach(({ fileName, content }) => {
      if (keyMap[fileName]) {
        const parsedContent = parseCsvContent(fileName, content);
        newParsedData[keyMap[fileName]] = [
          ...newParsedData[keyMap[fileName]],
          ...parsedContent,
        ];
      }
    });

    setParsedData(newParsedData);
  }, [datasToParse]);
  console.log("parsedData", parsedData);
  return {
    isLoading,
    isError,
    parseCsv,
    setDatasToParse,
  };
}
