export const findPartsOfSets = (setId: string) => {
  console.log("first", setId);
};

export const getParts = (setId: string) => {
  console.log("first", setId);
};

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

/* const transformParsedResult = (parsedResults: ResultType[]): NewObjType => {
    const newObj: NewObjType = {};

    parsedResults.forEach((result) => {
      newObj[result.fileName] = result.content;
      console.log("newObj", newObj);
    });
    return newObj;
  }; */

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
