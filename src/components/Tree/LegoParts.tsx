import { useState } from "react";
import { MergedObject } from "../../types/legoTypes";
import LegoPart from "./LegoPart";

type LegoPartsProps = {
  parts: MergedObject[];
};

export default function LegoParts({ parts }: LegoPartsProps) {
  console.log("Rendering LegoParts with parts:", parts);
  const [diplayLimit, setDiplayLimit] = useState<number>(5);
  const [start, setStart] = useState<number>(0);

  const visibleparts = parts.slice(0, diplayLimit);

  return (
    <ul className="legoParts">
      {visibleparts.map((part, partIndex) => (
        <LegoPart key={partIndex} part={part} />
      ))}
    </ul>
  );
}
