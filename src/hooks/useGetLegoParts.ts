import { useState, useEffect } from "react";
import { DataToParseType } from "../types/csvType";
import { extractKeysAndRows, mergeInventoryAndParts } from "../utils/utils";
import { cleanCsvContent, filteredRowsToConvert } from "../utils/parser";
import { MergedObject } from "../types/legoTypes";

export function useGetLegoParts(
  selectedSetIds: string[],
  datasToParse: DataToParseType[]
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [partsOfLegoSet, setPartsOfLegoSet] = useState<MergedObject[]>();

  // Fonction pour récupérer les pièces d'un Set LEGO
  const getPartsOfLegoSets = async (selectedSetIds: string[]) => {
    const inventoryData = datasToParse.find(
      (data) => data.fileName === "inventory"
    );
    const partsData = datasToParse.find((data) => data.fileName === "parts");

    console.log("inventoryData", inventoryData);
    console.log("partsData", partsData);

    if (!inventoryData || !partsData) {
      console.warn(
        "Données manquantes : inventoryData ou partsData est undefined"
      );
      setIsLoading(false); // Mettre à jour l'état de chargement
      return; // Sortir de la fonction si les données ne sont pas disponibles
    }
    try {
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
          selectedSetIds
        );

        const testInventory = cleanCsvContent(
          inventoryKeys,
          filteredRowsInventory
        );
        console.log("testInventory", testInventory);

        // extract Part-num of filteredRowsInventory
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

        // Mergin both Array
        const testMerging = mergeInventoryAndParts(testInventory, testParts);
        setPartsOfLegoSet(testMerging);
      }
    } catch (error) {
      console.error("Erreur lors du parsing des fichiers CSV :", error);
    }
  };

  useEffect(() => {
    console.log("SetId", selectedSetIds);
    console.log("datasToParse", datasToParse);

    getPartsOfLegoSets(selectedSetIds);
  }, [selectedSetIds]);

  return {
    isLoading,
    partsOfLegoSet,
  };
}
