import { useState } from "react";
import { Inventory, Part, Set } from "../../types/csvType";
import { LegoSetType, LegoSetType2, MergedObject } from "../../types/legoTypes";
import LegoSet from "./LegoSet";

type LegoSetsState = {
  sets: Set[];
  parts?: Part[];
  inventory?: Inventory[];
};
type LegoTreeProps = {
  legoSets: LegoSetsState;
  parts: MergedObject[];
  onClick: (setId: string) => void;
};

export default function LegoTree({ legoSets, parts, onClick }: LegoTreeProps) {
  const [diplayLimit, setDiplayLimit] = useState<number>(10);

  const visibleLegoSets = legoSets.sets.slice(0, diplayLimit);

  return (
    <main>
      <h2 className="title-level2">Lego Tree</h2>

      <ul className="parentNode">
        {visibleLegoSets.map((set, setIndex) => (
          <LegoSet
            key={`${set.set_id} ${setIndex}`}
            set={set}
            parts={parts}
            onClick={onClick}
          />
        ))}
      </ul>
    </main>
  );
}
