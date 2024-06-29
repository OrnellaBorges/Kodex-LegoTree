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
  sets?: Set[] | undefined;
  parts?: Part[] | undefined;
  inventory?: Inventory[] | undefined;
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

  //const [legoSets, setLegoSets] = useState<Set[]>();
  // const [legoParts, setLegoParts] = useState<Part[]>([]);
  // const [legoInventory, setLegoInventory] = useState<Part[]>([]); */

  /*  const [legoSetsCompleted, setLegoSetsCompleted] = useState<LegoSetType2[]>(
    []
  ); */

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

    const parseData = async () => {
      setIsLoading(true);

      try {
        const parsedResults = datasToParse.map((data) => {
          console.warn("parsinng");

          const { fileName, content } = data;
          console.log("fileNamedata ", fileName);

          if (fileName === "sets") {
            console.log("isSets");
            const sets = cleanCsvContent(content);

            setLegoData((prev) => ({ ...prev, sets }));
          }

          /*  return {
            key: data.fileName,
            content: convertCsvContent(data.content),
          }; */
        });

        // console.log("setsCsvData", setsCsvData);

        //const parsedSets = parseDataToObjects(setsCsvData);

        /*  const parsedResults = parseDataToObjects(datasToParse);
        console.log("parsedResults", parsedResults); */

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

    parseData();
  }, [datasToParse]);

  const handleSetClick = (setId: string) => {
    console.log("setId", setId);
  };

  console.log("legoData", legoData);

  return {
    isLoading,
    setDatasToParse,
    setSelectedSetIds,
  };
}
