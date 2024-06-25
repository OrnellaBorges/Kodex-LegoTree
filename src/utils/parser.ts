// type CsvRowType = [string, string, number];

type CsvRowType = (string | number)[];

export function stringParser(csvRows: string[]): string[] {
  const result: string[] = [];
  console.log("csvRows", csvRows);

  for (let i = 0; i < csvRows.length; i++) {
    console.log("INSIDE BIG LOOP");
    let currentStr = csvRows[i];
    console.log("currentStr", currentStr);
    /* let strIndex = i;
    console.log("strIndex", strIndex); */

    const spliter = ",";
    const quotes = '"';

    const splitedString = currentStr.split(spliter);
    console.log("splitedString", splitedString);

    let newElements = [];
    let temporaryStr = "";

    for (let j = 0; j < splitedString.length; j++) {
      console.log("1st LOOP");

      const quoteIsIncludes = splitedString[j].includes(quotes);
      console.log("quoteIsIncludes", quoteIsIncludes);
      // true si la boucle trouve des quotes
      if (quoteIsIncludes) {
        console.log("Quote here!");
        let indexOfRightQuotes = -1; // ???

        temporaryStr = splitedString[j].trim();
        console.log("temporaryStr:", temporaryStr);

        for (let k = j + 1; k < splitedString.length; k++) {
          console.log("2nd LOOP");
          // FUSION / MERGING
          temporaryStr += spliter + splitedString[k].trim();
          console.log("temporaryStr loop 2", temporaryStr);

          const nextString = splitedString[k];
          console.log("nextString", nextString);
          if (nextString.includes(quotes)) {
            indexOfRightQuotes = k;
            break;
          }
        }
        if (indexOfRightQuotes !== -1) {
          for (let k = j + 1; k <= indexOfRightQuotes; k++) {
            console.log("3rd LOOP");
            // FUSION / MERGING
            temporaryStr = temporaryStr + spliter + splitedString[k];
            console.log("temporaryStr Loop 3", temporaryStr);
          }

          newElements.push(temporaryStr);
          console.log("newElements", newElements);

          j = indexOfRightQuotes;
        } else {
          newElements.push(splitedString[j]);
        }
      } else {
        //false
        newElements.push(splitedString[j].trim());
      }
    }

    result.push(...newElements);
    console.log("result", result);
  }

  return result;
}

export function lineParser(csvRows: string[], limit: number): CsvRowType[] {
  const result: CsvRowType[] = [];
  console.log("csvRows", csvRows);

  for (let i = 0; i < csvRows.length; i++) {
    console.log("START BIG LOOP");
    let currentStr = csvRows[i];
    console.log("currentStr", currentStr);

    const spliter = ",";
    const quotes = '"';

    const splitedString = currentStr.split(spliter);
    console.log("splitedString", splitedString);

    let newElements: string[] = [];
    let tempElement = "";

    for (let j = 0; j < splitedString.length; j++) {
      console.log("1st LOOP");

      if (splitedString[j].includes(quotes)) {
        console.log("Quote here!");
        // stocker temporairement le morceau
        tempElement = splitedString[j].trim();

        let indexOfRightQuotes = -1;
        for (let k = j + 1; k < splitedString.length; k++) {
          console.log("2nd LOOP");
          //FUSION = MERGING
          tempElement += spliter + splitedString[k].trim();
          console.log("tempElement", tempElement);
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
        console.log("newElementsss", newElements);
      }
    }

    // quand le tableau newElements arrive a la limite
    if (newElements.length === limit) {
      console.log("fullfilled", newElements.length);
      result.push(newElements);
      console.log("result", result);
    }
    console.log("result.length", result.length);
    console.log("result", result);
  }

  return result;
}
