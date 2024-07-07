import React, { useState } from "react";
import { Set } from "../../types/csvType";
// import { LegoSetType, LegoSetType2 } from "../../types/legoTypes";
import LegoParts from "./LegoParts";
import { MergedObject } from "../../types/legoTypes";

type LegoSetProps = {
  set: Set;
  parts: MergedObject[];
  onClick: (setId: string) => void;
};

export default function LegoSet({ set, parts, onClick }: LegoSetProps) {
  const [isOpen, setIsOpen] = useState(false);

  //events
  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick(set.set_id);
    console.log(`Clicked on set: ${set.set_id}, isOpen: ${!isOpen}`);
  };

  return (
    <li className="legoSet" onClick={handleClick}>
      <h3>SET - {set.set_id}</h3>
      {isOpen && <LegoParts parts={parts} />}
    </li>
  );
}
