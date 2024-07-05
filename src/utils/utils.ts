// utils/extractKeysAndRows.ts
export const extractKeysAndRows = (dirtytext: string) => {
  const [keyRow, ...rows] = dirtytext.trim().split("\n");
  const keysArray = keyRow.split(",").map((element) => element.trim());
  return { keysArray, rows };
};

export const mergeInventoryAndParts = (inventory: any, parts: any) => {
  const partsDict = parts.reduce((acc, part) => {
    acc[part.part_num] = part;
    return acc;
  }, {});

  console.log("partsDict", partsDict);

  // Parcourir inventory et fusionner les objets
  const newParts = inventory.map((item) => {
    const part = partsDict[item.part_num];
    return {
      part_num: item.part_num,
      quantity: item.quantity,
      set_id: item.set_id,
      color: item.color,
      name: item._name,
      category: part ? part.category : "Unknown",
    };
  });

  console.log("newPart", newParts);

  return newParts;
};
