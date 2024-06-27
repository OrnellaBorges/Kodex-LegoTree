//import { ParsedData } from "../../types/csvType";

import { LegoSetType } from "../../types/legoTypes";
import LegoSet from "./LegoSet";

type LegoTreeProps = {
  data: LegoSetType[];
};
export default function LegoTree({ data }: LegoTreeProps) {
  return (
    <main>
      <h2>Lego Tree</h2>

      <ul>
        {data.map((set, index) => (
          <LegoSet key={`${set.set_id}${index}`} />
        ))}
      </ul>
    </main>
  );
}
