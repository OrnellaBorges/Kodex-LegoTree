import { useEffect } from "react";
import { ParsedData2 } from "../../types/csvType";

type LegoSetsViewerProps = {
  parsedData: ParsedData2;
};
export default function LegoSetsViewer({ parsedData }: LegoSetsViewerProps) {
  console.log("JJJJJJJ ", parsedData);

  return (
    <main>
      <h2>Lego Tree</h2>
      <ul></ul>
    </main>
  );
}
