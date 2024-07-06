import { MergedObject } from "../../types/legoTypes";

type LegoPartProps = {
  part: MergedObject;
};

export default function LegoPart({ part }: LegoPartProps) {
  //console.log("part", part);
  return (
    <li className="childNode">
      <p>{part.part_num}</p>
    </li>
  );
}
