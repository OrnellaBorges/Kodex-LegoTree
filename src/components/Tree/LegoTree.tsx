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
      <ul>
        {data.map((set) => (
          <LegoSet key={set.set_id} set={set} />
        ))}
      </ul>
    </main>
  );
}
