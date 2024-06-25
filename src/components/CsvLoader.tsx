import { useState } from "react";
import { readCsv } from "../utils/formatCsv";
import Input from "./Form/Input";
import { useCsvParser } from "../hooks/useCsvParser";

const csvContentTest = `part_number,name,category
10315,Brick 2 x 4,12
60583b,"Brick Special 1 x 1 x 3 with 2 Clips Vertical [Hollow Stud, Open O Clips]",5
10315f, " Brick, 2 x 4",12
10315s,"Brick 2 x 4",12
`;

const Test2 = `part_num,_name,category
10170,Pretzel,27
10201,Bracket 1 x 2 - 1 x 4 [Rounded Corners],9
10247,Plate Special 2 x  2 with 1 Pin Hole [Complete Underside Rib],9
10314,"Brick 1 x 4 x 1 1/3 No Studs, Curved Top, with Raised Inside Support",37
`;

export default function CsvLoader() {
  const [fileList, setFileList] = useState<File[]>([]);

  const { parseCsv } = useCsvParser();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT");

    /*   if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    } */

    try {
      // Attendre la résolution de la promesse
      //const csvContent = await readCsv(fileList[0]);
      //console.log("csvContent FROM readCsv api =", csvContent);
      const dataParsed = parseCsv(Test2);
      //console.log("dataParsed", dataParsed);
      // Parser CSV de readCsv
      //const toto = parseCsv(csvContent);
      //console.log("toto", toto);
      //const tata = generateObjectArray(toto);
      //console.warn("Données parsées :", parsedCsv);
      //setParsedData(parsedData); // Mettre à jour l'état avec les données parsées
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
    }
    /* const resultCsv = readCsv(fileList[0]);
        console.log("resultCsv =>>>", resultCsv); */
    //const formatedCsv = parseCsvToArray(csv)
  };

  return (
    <div>
      <form id="csvForm" onSubmit={handleSubmitForm}>
        <Input setFileList={setFileList} />
        <button type="submit">SUBMIT PARSING</button>
      </form>
    </div>
  );
}
