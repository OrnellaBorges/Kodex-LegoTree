import { useState, useEffect } from "react";

type CSVDataType = {
  [key: string]: string;
};

type SetData = {
  set_id: string;
  _name: string;
  year: string;
  theme: string;
  parts: PartData[];
};

type PartData = {
  part_num: string;
  name: string;
  color: string;
  quantity: number;
};
export function useCsvParser() {
  const [parsedCsvDatas, setParsedCsvData] = useState<CSVDataType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // fonction qui converti les csv en tableau d'objet
  const parseCsv = (csvContent: string): CSVDataType[] => {
    const [keyRow, ...rows] = csvContent.trim().split("\n");
    console.log("keyRow", keyRow);
    console.log("rows", rows);
    const keys = keyRow.split(",").map((header) => header.trim());
    console.log("keys", keys);

    return rows.map((row) => {
      const rowValues = row.split(",").map((value) => value.trim());
      console.log("rowValues", rowValues);
      return keys.reduce((obj, key, index) => {
        (obj as CSVDataType)[key] = rowValues[index];
        return obj;
      }, {} as CSVDataType);
    });
  };

  return {
    isLoading,
    isError,
    parsedCsvDatas,
  };
}
