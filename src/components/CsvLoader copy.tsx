import { useState } from "react";
import { readCsv } from "../utils/formatCsv";
import Input from "./Form/Input";
//import { useCsvParser } from "../hooks/useHook";

import { CSVParsedDataType } from "../types/csvType";

export default function CsvLoader() {
  const [fileList, setFileList] = useState<File[]>([]);
  //const [csvDirty, setCsvDirty] = useState<string[]>([]);
  //const [csvData, setCsvData] = useState<CSVParsedDataType[]>([]);

  //const { setDatasToParse } = useCsvParser();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT FILES");

    if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    try {
      // Attendre la résolution des promess
      const resultReader = await Promise.all(
        fileList.map(async (file) => ({
          fileName: file.name,
          content: await readCsv(file),
        }))
      );

      console.log("resultReader", resultReader);

      //SOLUCE GPT POUR IDENTIFIER CE QU'ON ENVOI

      // Envoyer chaque type de données à setDataToParse en fonction du nom du fichier

      // Envoyer les résultats au hook
      //setDatasToParse(resultReader);

      //JE Peux PAS FAIRE CA !
      /* setCsvDirty((prev) => {
        console.log("prevDirty => ", prev);
        const updateCsvDirty = [...prev, resultReader];
        console.log("updateCsvDirty", updateCsvDirty);
        return updateCsvDirty;
      }); */

      // pourquoi ici c'est vide ?????
      // console.log("csvDirty STATE dans le try ", csvDirty);

      /* 
      for (let i = 0; i < fileList.length; i++) {
        console.log("LOOOOOOOP");
        const currentFile = fileList[i];
        console.log("currentFile ===", currentFile);

        const csvContent = await readCsv(fileList[i]);
        console.log("csvContent FROM readCsv api =", csvContent);

        // Updtae state => stocker dans le state qui va recup chaque csvDirty
        setCsvDirty((prev) => {
          console.log("prevDirty => ", prev);
          const updateCsvDirty = [...prev, csvContent];
          console.log("updateCsvDirty", updateCsvDirty);
          return updateCsvDirty;
        });

        console.log("csvDirty :", csvDirty);
      } */
      //console.log("csvDirty :", csvDirty);

      //const dataParsed = parseCsv(csvDirty);
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
  };

  //console.log("csvDirty STATE hors du HANDLEsUBMIT", csvDirty);

  return (
    <div>
      <form id="csvForm" onSubmit={handleSubmitForm}>
        <Input setFileList={setFileList} />
        <button className="button" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
