import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  Inventory,
  LEGOSet,
  LegoSet,
  ParsedData,
  Part,
  Set,
} from "../types/csvType";

import { lineParser } from "../utils/parser";
import { InventoryPart, LegoSetType } from "../types/legoTypes";

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

export function useHook() {
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*   const [legoSets, setLegoSets] = useState<Set[]>([]);
  const [legoParts, setLegoParts] = useState<Part[]>([]);
  const [legoInventory, setLegoInventory] = useState<Part[]>([]); */

  const [legoSetsCompleted, setLegoSetsCompleted] = useState<LegoSetType2[]>(
    []
  );

  const parseContent = (dirtytext: string): CSVDataType[] => {
    const [keyRow, ...rows] = dirtytext.trim().split("\n");
    const keysArray = keyRow.split(",").map((element) => element.trim());
    const limitedRows = rows.slice(0, 5000);
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
    if (datasToParse.length === 0) {
      console.log("Pas de parsing");
      return;
    }

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

        //console.log("parsedResults", parsedResults);

        const transformedResult = transformParsedResult(parsedResults);

        const { sets, parts, inventory } = transformedResult; // destructure l'objet

        const findPartsOfSets = sets.map((set) => {
          const partsInventory = inventory
            .filter((item) => item.set_id === set.set_id)
            .map((piece) => {
              const searchMissingkey = parts.find(
                (el) => el.part_num === piece.part_num
              );
              return searchMissingkey
                ? { ...piece, category: searchMissingkey.category }
                : piece;
            });

          console.log("partsInventory", partsInventory);
          //Retourner un nouvel objet
          return {
            set_id: set.set_id,
            _name: set._name,
            year: set.year,
            theme: set.theme,
            parts: partsInventory,
          };
        });

        console.log("findPartsOfSets", findPartsOfSets);

        /* setLegoSets(sets);
        setLegoParts(parts);
        setLegoInventory(inventory); */

        //setLegoSetsCompleted(findPartsOfSets);
      } catch (error) {
        console.error("Erreur lors du parsing des fichiers CSV :", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    parseData();
  }, [datasToParse]);

  useEffect(() => {});

  return {
    isLoading,
    setDatasToParse,
    legoSetsCompleted,
  };
}
