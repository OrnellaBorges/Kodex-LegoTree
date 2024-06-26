import React from "react";
import { useCsvParser } from "../../hooks/useCsvParser";
import { ParsedData } from "../../types/csvType";

type LegoSetsViewerProps = {
  data: ParsedData;
};
export default function LegoSetsViewer({ data }: LegoSetsViewerProps) {
  return (
    <main>
      <ul></ul>
    </main>
  );
}
