import { Inventory } from "../../types/csvType";
import { LegoPartType, MergedObject } from "../../types/legoTypes";
import LegoPart from "./LegoPart";

type LegoPartsProps = {
  parts: MergedObject[];
};

export default function LegoParts({ parts }: LegoPartsProps) {
  return (
    <ul className="legoParts">
      {parts.map((part, partIndex) => (
        <LegoPart key={partIndex} part={part} />
      ))}
    </ul>
  );
}
