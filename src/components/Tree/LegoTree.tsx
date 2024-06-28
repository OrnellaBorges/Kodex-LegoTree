import React from "react";
import { LegoSetType } from "../../types/legoTypes";
import LegoSet from "./LegoSet";

type LegoTreeProps = {
  data: LegoSetType[];
};

export default function LegoTree({ data }: LegoTreeProps) {
  return (
    <main>
      <h2>Lego Tree</h2>
      <ul className="parentNode">
        {data.map((set, setIndex) => (
          <LegoSet key={`${set.set_id} ${setIndex}`} set={set} />
        ))}
      </ul>
    </main>
  );
}
