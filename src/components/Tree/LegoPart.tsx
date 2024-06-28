import React, { useState } from "react";
import { LegoPartType, InventoryPart } from "../../types/legoTypes";
import InventoryDetails from "./InventoryDetails";

type LegoPartProps = {
  part: InventoryPart;
};

export default function LegoPart({ part }: LegoPartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpandPart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="childNode">
      <div onClick={toggleExpandPart}>
        <p>{part._name}</p>
      </div>
      {/*  {isOpen && <InventoryDetails inventory={part.inventory_part} />} */}
    </li>
  );
}
