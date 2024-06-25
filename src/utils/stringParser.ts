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

    for (let j = 0; j < splitedString.length; j++) {
      console.log("1st LOOP");

      const quoteIsIncludes = splitedString[j].includes(quotes);
      console.log("quoteIsIncludes", quoteIsIncludes);
      // true
      if (quoteIsIncludes) {
        console.log("Quote here!");
        let indexOfRightQuotes = -1;
        let strWithQuote = splitedString[j].trim();
        console.log("strWithQuote", strWithQuote);

        for (let k = j + 1; k < splitedString.length; k++) {
          console.log("2nd LOOP");
          const kString = splitedString[k];
          console.log("kString", kString);
          if (splitedString[k].includes(quotes)) {
            indexOfRightQuotes = k;
            break;
          }
        }
        if (indexOfRightQuotes !== -1) {
          for (let k = j + 1; k <= indexOfRightQuotes; ++k) {
            console.log("3rd LOOP");
            const mergeStringWithQuotes =
              strWithQuote + spliter + splitedString[k];
            console.log("mergeStringWithQuotes", mergeStringWithQuotes);
          }
          newElements.push(strWithQuote);
          j = indexOfRightQuotes;
        } else {
          newElements.push(splitedString[j]);
        }
      } else {
        //false
        newElements.push(splitedString[j]);
      }
    }

    result.push(...newElements);
  }

  return result;
}

export function stringParserV2(csvRows: string[]) {
  const parsedData: any[] = [];

  for (let i = 0; i < csvRows.length; i++) {
    const row = csvRows[i];

    const spliter = ",";
    const quotes = '"';

    const splitedString = row.split(spliter);

    let newElements = [];

    for (let j = 0; j < splitedString.length; j++) {
      let element = splitedString[j].trim();

      if (element.startsWith(quotes) && element.endsWith(quotes)) {
        // Remove surrounding quotes
        element = element.slice(1, -1);
      }

      newElements.push(element);
    }

    parsedData.push(newElements);
  }

  return parsedData;
}
