import React, { useState } from "react";
import { Set } from "../../types/csvType";

type LegoSetProps = {
  legoSets: Set[];
  actionClick: () => void;
  setSelectedSetIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function LegoSet({
  legoSets,
  actionClick,
  setSelectedSetIds,
}: LegoSetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick =
    (setId: string) => (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault(); // Empêche le comportement par défaut du navigateur si nécessaire
      setIsOpen(!isOpen);

      setSelectedSetIds((prev) => {
        if (prev.includes(setId)) {
          return prev.filter((id) => id !== setId);
        } else {
          return [...prev, setId];
        }
      });
    };

  return (
    <ul>
      {legoSets.map((set, setIndex) => (
        <li
          key={setIndex}
          className="legoSet"
          onClick={handleClick(set.set_id)}
        >
          <h3>SET - {set.set_id}</h3>
        </li>
      ))}
      {legoSets && <button onClick={actionClick}>Next Sets</button>}
    </ul>
  );
}
