import { useState, useEffect } from "react";
import {
  CSVDataType,
  DataToParseType,
  Inventory,
  Part,
  Set,
} from "../types/csvType";

import { cleanCsvContent, filteredRowsToConvert } from "../utils/parser";
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

  const [partsOfLegoSet, setPartsOfLegoSet] = useState<Part[]>();

  useEffect(() => {
    if (datasToParse.length === 0) {
      console.log("Pas de parsing");
      return;
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

    /*  const newData = datasToParse.filter((el) => el.fileName !== "sets");
    console.log("newData", newData); */

    // filteredRowsToConvert()
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
