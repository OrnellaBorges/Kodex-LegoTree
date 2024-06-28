import React, { useState } from "react";
import { LegoSetType, LegoSetType2 } from "../../types/legoTypes";
import LegoParts from "./LegoParts";

type LegoSetProps = {
  set: LegoSetType2;
};

export default function LegoSet({ set }: LegoSetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenPart = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li>
      <div onClick={toggleOpenPart}>
        <h3>{set._name}</h3>
      </div>
      {isOpen && <LegoParts parts={set.parts} />}
    </li>
  );
}
