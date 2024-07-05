import React, { useState } from "react";
import {
  LegoPartType,
  InventoryPart,
  MergedObject,
} from "../../types/legoTypes";

type LegoPartProps = {
  part: MergedObject;
};

export default function LegoPart({ part }: LegoPartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpandPart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="childNode">
      <p>{part._name}</p>
      {/*       <div onClick={toggleExpandPart}></div> */}
    </li>
  );
}
