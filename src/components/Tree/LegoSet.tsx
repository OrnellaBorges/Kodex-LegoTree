import React, { useState } from "react";
import { LegoSetType } from "../../types/legoTypes";
import LegoParts from "./LegoParts";

type LegoSetProps = {
  set: LegoSetType;
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
