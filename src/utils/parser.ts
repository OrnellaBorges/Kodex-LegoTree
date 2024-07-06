import { CSVDataType } from "../types/csvType";
//import { CsvData } from "../types/";

type CsvRowType = (string | number)[];

function rowCleaner(csvRows: string[], limit: number): CsvRowType[] {
  const result: CsvRowType[] = [];
  console.log("CLEANING ROWS");

  for (let i = 0; i < csvRows.length; i++) {
    //console.log("START BIG LOOP PARSER LINE");
    let currentStr = csvRows[i];
    //console.log("currentStr", currentStr);

    const spliter = ",";
    const quotes = '"';

    const splitedString = currentStr.split(spliter);
    //console.log("splitedString", splitedString);

    let newElements: string[] = [];
    let tempElement = "";

    for (let j = 0; j < splitedString.length; j++) {
      //console.log("1st LOOP");

      if (splitedString[j].includes(quotes)) {
        //console.log("Quote here!");
        // stocker temporairement le morceau
        tempElement = splitedString[j].trim();

        let indexOfRightQuotes = -1;
        for (let k = j + 1; k < splitedString.length; k++) {
          //console.log("2nd LOOP");
          //FUSION = MERGING
          tempElement += spliter + splitedString[k].trim();
          //console.log("tempElement", tempElement);
          if (splitedString[k].includes(quotes)) {
            indexOfRightQuotes = k;
            break;
          }
        }
        // une fois que l'index n'est plus -1 car on a trouvé le deuxieme quote
        if (indexOfRightQuotes !== -1) {
          // on pousse la string fussionné dans tableau
          newElements.push(tempElement);
          // on reaffecte la position de j a la postion de la dernière quote
          j = indexOfRightQuotes;
        } else {
          newElements.push(splitedString[j]);
        }
      } else {
        newElements.push(splitedString[j].trim());
        //console.log("newElementsss", newElements);
      }
    }

    // quand le tableau newElements arrive a la limite
    if (newElements.length === limit) {
      //console.log("fullfilled :", newElements.length, "limit :", limit);
      result.push(newElements);
      //console.log("result", result);
    }
    //console.log("result.length", result.length);
    //console.log("result", result);
  }

  return result;
}

export const cleanCsvContent = (
  keysArray: string[],
  dirtytext: string[]
): CSVDataType[] => {
  const limitedRows = dirtytext.slice(0, 5000);
  const cleanedRows = rowCleaner(limitedRows, keysArray.length);

  const result = cleanedRows.map((row) => {
    return keysArray.reduce((obj, key, index) => {
      obj[key] = row[index];
      return obj;
    }, {} as CSVDataType);
  });
  return result;
};

export const determineFilterKey = (fileName: string): string => {
  if (fileName === "parts") {
    return "part_num";
  } else if (fileName === "inventory") {
    return "set_id";
  } else {
    throw new Error(
      `Nom de fichier "${fileName}" non supporté pour le filtrage.`
    );
  }
};

export const filteredRowsToConvert = (
  keysArray: string[],
  fileName: string,
  dirtyText: string[],
  selectedId: string | string[]
): string[] => {
  console.log("selectedId", selectedId);

  const filterKey = determineFilterKey(fileName);
  console.log("filterKey", filterKey);

  const index = keysArray.indexOf(filterKey);
  console.log("index", index);

  if (index === -1) {
    throw new Error(
      `Clé de filtre "${filterKey}" introuvable dans les clés fournies.`
    );
  }

  const filteredRows = dirtyText.filter((row) => {
    const rowElements = row.split(",").map((str) => str.trim());
    const valueToFound = rowElements[index];
    // console.log("valueToFound", valueToFound);

    if (Array.isArray(selectedId)) {
      return selectedId.includes(valueToFound);
    } else {
      return valueToFound === selectedId;
    }
  });

  return filteredRows;
};
