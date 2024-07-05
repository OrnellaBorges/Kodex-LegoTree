import { MergedObject } from "../../types/legoTypes";

type LegoPartProps = {
  part: MergedObject;
};

export default function LegoPart({ part }: LegoPartProps) {
  console.log("part", part);
  return (
    <li className="childNode">
      <p>{part.name}</p>
      <p>{part.color}</p>
      <p>{part.category}</p>
    </li>
  );
}
