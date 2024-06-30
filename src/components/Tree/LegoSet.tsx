import React, { useState } from "react";
import { Set } from "../../types/csvType";
// import { LegoSetType, LegoSetType2 } from "../../types/legoTypes";
import LegoParts from "./LegoParts";

type LegoSetProps = {
  set: Set;
  onClick: (setId: string) => void;
};

export default function LegoSet({ set, onClick }: LegoSetProps) {
  const [isOpen, setIsOpen] = useState(false);

  //events
  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick(set.set_id);
  };

  return (
    <li className="legoSet" onClick={handleClick}>
      <h3>{set._name}</h3>

      {/* {isOpen && <LegoParts parts={set.parts} />} */}
    </li>
  );
}
