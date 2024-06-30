import { Inventory, Part, Set } from "../../types/csvType";
import { LegoSetType, LegoSetType2 } from "../../types/legoTypes";
import LegoSet from "./LegoSet";

type LegoSetsState = {
  sets: Set[];
  parts?: Part[];
  inventory?: Inventory[];
};
type LegoTreeProps = {
  data: LegoSetsState;
  onClick: (setId: string) => void;
};

export default function LegoTree({ data, onClick }: LegoTreeProps) {
  return (
    <main>
      <h2>Lego Tree</h2>
      <ul className="parentNode">
        {data.sets.map((set, setIndex) => (
          <LegoSet
            key={`${set.set_id} ${setIndex}`}
            set={set}
            onClick={onClick}
          />
        ))}
      </ul>
    </main>
  );
}
