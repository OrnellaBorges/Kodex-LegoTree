import { useEffect, useState } from "react";
import { MergedObject } from "../../types/legoTypes";
import LegoPart from "./LegoPart";
import { displayPartsToString } from "typescript";

type LegoPartsProps = {
  parts: { setId: string; parts: MergedObject[] }[];
};

export default function LegoParts({ parts }: LegoPartsProps) {
  // console.log("Rendering LegoParts with parts:", parts);
  const [displayLimit, setDisplayLimit] = useState<number>(5);
  const [start, setStart] = useState<number>(0);

  const [visibleParts, setVisibleParts] = useState<
    { setId: string; parts: MergedObject[] }[]
  >([]);

  useEffect(() => {
    setVisibleParts(
      parts.map((set) => ({
        setId: set.setId,
        parts: set.parts.slice(start, start + displayLimit),
      }))
    );
  }, [parts, start, displayLimit]);
  const displayNextParts = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("next Parts");
    e.stopPropagation(); // Stop event propagation
    setStart((prevStart) => prevStart + displayLimit);
  };

  return (
    <>
      {visibleParts.map((set) => (
        <div key={set.setId}>
          <h3>Parts for Set {set.setId}</h3>
          <ul className="legoParts">
            {set.parts.map((part, partIndex) => (
              <LegoPart key={partIndex} part={part} />
            ))}
          </ul>
        </div>
      ))}
      <button onClick={displayNextParts}>Next</button>
    </>
  );
}
