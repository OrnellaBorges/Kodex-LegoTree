type CsvRowType = (string | number)[];

export function lineParser(csvRows: string[], limit: number): CsvRowType[] {
  const result: CsvRowType[] = [];
  //console.log("csvRows", csvRows);

  for (let i = 0; i < csvRows.length; i++) {
    console.log("START BIG LOOP PARSER LINE");
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
