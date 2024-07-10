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
  const [partsOfLegoSets, setPartsOfLegoSets] = useState<
    { setId: string; parts: MergedObject[] }[]
  >([]);

  // Fonction pour récupérer les pièces d'un Set LEGO
  const getPartsOfLegoSets = async (selectedSetIds: string[]) => {
    console.log("selectedSetIds", selectedSetIds);
    setIsLoading(true);
    // reinitiliser à vide
    //setPartsOfLegoSets([]);
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
      console.log("inventoryRows readed", inventoryRows.length); // 1666

      if (inventoryData && partsData) {
        const newParts = [...partsOfLegoSets];

        for (const setId of selectedSetIds) {
          console.warn("LOOP FOR OF");

          // check si le set a déjà été convertit

          const isAlreadyParsed = newParts.some((set) => set.setId === setId);
          console.log("isSetParsed", isAlreadyParsed);

          if (isAlreadyParsed) {
            console.log("already parsed");
            continue;
          }

          // Vérifier si au moins un setId existe dans les données d'inventaire
          const isValidSetId = inventoryRows.some((row) => {
            //vérifier si setId existe dans les lignes de inventory
            return row.includes(setId);
          });
          console.log("isValidSetId", isValidSetId);

          if (!isValidSetId) {
            console.warn(`Le set id ${setId} n'existe pas dans l'inventaire.`);
            continue; // Passer au prochain setId si celui-ci n'existe pas
          }

          const filteredRowsInventory = filteredRowsToConvert(
            inventoryKeys,
            inventoryFileName,
            inventoryRows,
            setId
          );

          console.log("filteredRows >Inventory", filteredRowsInventory);

          const testInventory = cleanCsvContent(
            inventoryKeys,
            filteredRowsInventory
          );
          console.log("testInventory", testInventory);

          // extract Part-num of filteredRowsInventory
          const partNums = filteredRowsInventory.map((r) => {
            const rowElements = r.split(",").map((str) => str.trim());

            const index = inventoryKeys.indexOf("part_num"); // index 0
            //console.log("index", index);
            return rowElements[index];
          });
          console.log("partNums", partNums); // contien la liste des part-nums du Set

          const { fileName: partFileName, content: partContent } = partsData;
          const { keysArray: partKeys, rows: partRows } =
            extractKeysAndRows(partContent);

          const filteredRowsParts = filteredRowsToConvert(
            partKeys,
            partFileName,
            partRows,
            partNums
          );

          console.log("filteredRowsParts", filteredRowsParts);
          const testParts = cleanCsvContent(partKeys, filteredRowsParts);

          console.log("testparts", testParts);
          const mergedParts = mergeInventoryAndParts(testInventory, testParts);

          newParts.push({ setId, parts: mergedParts });

          /* if (!newParts[setId]) {
            newParts[setId] = [];
          }
          newParts[setId] = [...newParts[setId], ...mergedParts]; */
        }

        setPartsOfLegoSets(newParts);
      }
    } catch (error) {
      console.error("Erreur lors du parsing des fichiers CSV :", error);
    } finally {
      setIsLoading(false); // Mettre à jour l'état de chargement à false
    }
  };

  useEffect(() => {
    console.log("SetId", selectedSetIds);
    getPartsOfLegoSets(selectedSetIds);
  }, [selectedSetIds]);

  const handleNextPartsClick = () => {
    console.log("next Parts");
  };

  return {
    isLoading,
    partsOfLegoSets,
    handleNextPartsClick,
  };
}
