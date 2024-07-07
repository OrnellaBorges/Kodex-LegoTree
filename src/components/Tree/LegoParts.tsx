import { useEffect, useState } from "react";
import { MergedObject } from "../../types/legoTypes";
import LegoPart from "./LegoPart";

type LegoPartsProps = {
  parts: MergedObject[];
};

export default function LegoParts({ parts }: LegoPartsProps) {
  const [displayLimit, setDisplayLimit] = useState<number>(5);
  const [start, setStart] = useState<number>(0);

  const [visibleParts, setVisibleParts] = useState<MergedObject[]>([]);
  console.log("parts", parts);

  useEffect(() => {
    setVisibleParts(parts.slice(start, start + displayLimit));
  }, [parts, start, displayLimit]);

  const displayNextParts = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("next Parts");
    e.stopPropagation();
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
