import React from "react";
import { useCsvParser } from "../../hooks/useCsvParser";
import { ParsedData } from "../../types/csvType";

type LegoSetsViewerProps = {
  parsedDatas: ParsedData;
};
export default function LegoSetsViewer({ parsedDatas }: LegoSetsViewerProps) {
  console.log("JJJJJJJ ", parsedDatas);

  return (
    <main>
      <ul></ul>
    </main>
  );
}
