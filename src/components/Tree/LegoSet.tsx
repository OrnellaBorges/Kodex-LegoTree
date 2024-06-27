import React from "react";
import LegoParts from "./LegoParts";
import { LegoSetType } from "../../types/legoTypes";

type SetDataProps = {
  set: string;
};

export default function LegoSet(): SetDataProps {
  return (
    <div>
      <li>{set._name}</li>
    </div>
  );
}
