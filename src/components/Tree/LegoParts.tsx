import { LegoPartType } from "../../types/legoTypes";
import LegoPart from "./LegoPart";

type LegoPartsProps = {
  parts: LegoPartType[];
};

export default function LegoParts({ parts }: LegoPartsProps) {
  return (
    <ul>
      {parts.map((part) => (
        <LegoPart key={part.part_num} part={part} />
      ))}
    </ul>
  );
}
