// utils/extractKeysAndRows.ts
export const extractKeysAndRows = (dirtytext: string) => {
  const [keyRow, ...rows] = dirtytext.trim().split("\n");
  const keysArray = keyRow.split(",").map((element) => element.trim());
  return { keysArray, rows };
};
