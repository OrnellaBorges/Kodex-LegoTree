import { useEffect, useState } from "react";
import { MergedObject } from "../../types/legoTypes";
import LegoPart from "./LegoPart";
import { displayPartsToString } from "typescript";

type LegoPartsProps = {
  parts: MergedObject[];
};

export default function LegoParts({ parts }: LegoPartsProps) {
  // console.log("Rendering LegoParts with parts:", parts);
  const [displayLimit, setDisplayLimit] = useState<number>(5);
  const [start, setStart] = useState<number>(0);

  const [visibleParts, setVisibleParts] = useState<MergedObject[]>([]);

  useEffect(() => {
    setVisibleParts(parts.slice(start, start + displayLimit));
  }, [parts, start]);

  const displayNextParts = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("next Parts");
    e.stopPropagation(); // Stop event propagation
    setStart((prevStart) => prevStart + displayLimit);
  };

  return (
    <>
      <ul className="legoParts">
        {visibleParts.map((part, partIndex) => (
          <LegoPart key={partIndex} part={part} />
        ))}
      </ul>

      <button onClick={displayNextParts}>Next</button>
    </>
  );
}
