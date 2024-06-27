import React from "react";
import { InventoryPart } from "../../types/legoTypes";

type InventoryDetailsProps = {
  inventory: InventoryPart;
};

export default function InventoryDetails({ inventory }: InventoryDetailsProps) {
  return (
    <div>
      <p>Name: {inventory._name}</p>
      <p>Quantity: {inventory.quantity}</p>

      <p>Color: {inventory.color}</p>
    </div>
  );
}
