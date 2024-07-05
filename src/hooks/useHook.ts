import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  Inventory,
  Part,
  Set,
} from "../types/csvType";

import {
  cleanCsvContent,
  filteredRowsToConvert,
  filteredRowsWithSet,
} from "../utils/parser";
import { InventoryPart, LegoSetType } from "../types/legoTypes";
import { extractKeysAndRows, mergeInventoryAndParts } from "../utils/utils";

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

  //const [partsOfLegoSet, setPartsOfLegoSet] = useState<Part[]>();

  // Fonction pour récupérer les pièces d'un ensemble LEGO
  const getPartsOfLegoSets = async (selectedSetId: string) => {
    try {
      const inventoryData = datasToParse.find(
        (data) => data.fileName === "inventory"
      );
      console.log("inventoryData", inventoryData);
      const partsData = datasToParse.find((data) => data.fileName === "parts");
      console.log("partsData", partsData);
      const { fileName: inventoryFileName, content: inventoryContent } =
        inventoryData;
      const { keysArray: inventoryKeys, rows: inventoryRows } =
        extractKeysAndRows(inventoryContent);
      console.log("inventoryKeys", inventoryKeys);
      console.log("inventoryRows", inventoryRows);
      if (inventoryData && partsData) {
        const filteredRowsInventory = filteredRowsToConvert(
          inventoryKeys,
          inventoryFileName,
          inventoryRows,
          selectedSetId
        );

        const testInventory = cleanCsvContent(
          inventoryKeys,
          filteredRowsInventory
        );
        console.log("testInventory", testInventory);

        // extract Part-num de filteredRowsInventory
        const partNums = filteredRowsInventory.map((r) => {
          const rowElements = r.split(",").map((str) => str.trim());
          //console.log("rowElements", rowElements);
          const index = inventoryKeys.indexOf("part_num"); // index 0
          //console.log("index", index);
          return rowElements[index];
        });
        console.log("partNums", partNums); // contien la liste des part-nums du Set
        const { fileName: partFileName, content: partContent } = partsData;
        const { keysArray: partKeys, rows: partRows } =
          extractKeysAndRows(partContent);

        console.log("partKeys", partKeys);
        console.log("partRows", partRows);

        const filteredRowsParts = filteredRowsToConvert(
          partKeys,
          partFileName,
          partRows,
          partNums
        );
        console.log("filteredRowsParts", filteredRowsParts);
        const testParts = cleanCsvContent(partKeys, filteredRowsParts);

        console.log("testparts", testParts);

        // Mergin both Datas
        const testMerging = mergeInventoryAndParts(testInventory, testParts);
        //console.log("testMerging", testMerging);
      }
    } catch (error) {
      console.error("Erreur lors du parsing des fichiers CSV :", error);
    }
  };

  useEffect(() => {
    if (datasToParse.length === 0) {
      console.log("Pas de parsing");
      return;
    }
    console.log("datasToParse", datasToParse);
    const parseSets = async () => {
      setIsLoading(true);

      try {
        const setsData = datasToParse.find((data) => data.fileName === "sets");

        if (setsData) {
          const { content } = setsData;
          const { keysArray, rows } = extractKeysAndRows(content);
          const parsedSets = cleanCsvContent(keysArray, rows) as Set[];
          setLegoData((prevData) => ({
            ...prevData,
            sets: parsedSets,
          }));
          // Retirer "sets" de datasToParse pour eviter un traitement inutile
          setDatasToParse((prevData) =>
            prevData.filter((data) => data.fileName !== "sets")
          );
        }
      } catch (error) {
        console.error("Erreur lors du parsing des fichiers CSV :", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    parseSets();
  }, [datasToParse]);

  useEffect(() => {
    console.log("SetId", selectedSetIds);
    console.log("datasToParse", datasToParse);

    getPartsOfLegoSets(selectedSetIds[0]);
  }, [selectedSetIds]);

  //a DEPLACER dans APP
  const handleSetClick = (setId: string) => {
    setSelectedSetIds((prev) => {
      //Verifier la présence de l'id dans le tableau
      if (prev.includes(setId)) {
        return prev.filter((id) => id !== setId);
      } else {
        return [...prev, setId];
      }
    });
  };

  return {
    isLoading,
    setDatasToParse,
    setSelectedSetIds,
    legoData,
    handleSetClick,
  };
}
