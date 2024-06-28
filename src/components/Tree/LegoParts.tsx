import { Inventory } from "../../types/csvType";
import { LegoPartType } from "../../types/legoTypes";
import LegoPart from "./LegoPart";

type LegoPartsProps = {
  parts: Inventory[];
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
