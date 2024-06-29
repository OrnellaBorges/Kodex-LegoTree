import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  Inventory,
  Part,
  Set,
} from "../types/csvType";

import { cleanCsvContent } from "../utils/parser";
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

type LegoSetsState = {
  sets: Set[];
  parts?: Part[];
  inventory?: Inventory[];
};

export function useHook() {
  const [datasToParse, setDatasToParse] = useState<DataToParseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([]);

  const [legoData, setLegoData] = useState<LegoSetsState>({
    sets: [],
    parts: [],
    inventory: [],
  });

  /* const transformParsedResult = (parsedResults: ResultType[]): NewObjType => {
    const newObj: NewObjType = {};

    parsedResults.forEach((result) => {
      newObj[result.fileName] = result.content;
      console.log("newObj", newObj);
    });
    return newObj;
  }; */

  useEffect(() => {
    if (datasToParse.length === 0) {
      console.log("Pas de parsing");
      return;
    }

    if (datasToParse.length > 0) {
      console.log("datasToParse Tableau d'ojet", datasToParse);
    }

    const parseSets = async () => {
      setIsLoading(true);

      try {
        const setsData = datasToParse.find((data) => data.fileName === "sets");

        if (setsData) {
          const { content, fileName } = setsData;
          const parsedSets = cleanCsvContent(content, fileName) as Set[];
          setLegoData((prevData) => ({
            ...prevData,
            sets: parsedSets,
          }));
        }

        /* 
        const transformedResult = parsedResults.reduce(
          (acc, { key, content }) => {
            acc[key] = content;
            return acc;
          },
          {} as NewObjType
        );
 */
        //const { sets } = transformedResult; // destructure l'objet

        // setLegoSets(sets);

        /* const findPartsOfSets = sets.map((set) => {
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
        }); */

        //console.log("findPartsOfSets", findPartsOfSets);

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

    parseSets();
  }, [datasToParse]);

  const handleSetClick = (setId: string) => {
    console.log("setId", setId);
  };

  console.log("legoData", legoData);

  return {
    isLoading,
    setDatasToParse,
    setSelectedSetIds,
    legoData,
  };
}
