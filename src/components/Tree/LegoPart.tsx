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
  return (
    <li className="childNode">
      <p>{part._name}</p>
    </li>
  );
}
