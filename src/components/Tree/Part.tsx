import React, { useState } from "react";
import { LegoPartType } from "../../types/legoTypes";
import InventoryDetails from "./InventoryDetails";

type LegoPartProps = {
  part: LegoPartType;
};

export default function LegoPart({ part }: LegoPartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div onClick={toggleOpen}>
        <p>{part._name}</p>
      </div>
      {isOpen && <InventoryDetails inventory={part.inventory_part} />}
    </li>
  );
}
