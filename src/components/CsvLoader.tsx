import { useState } from "react";
import { readCsv } from "../utils/formatCsv";
import Input from "./Form/Input";
import { useCsvParser } from "../hooks/useCsvParser";

//import { CSVParsedDataType } from "../types/csvType";

export default function CsvLoader() {
  const [fileList, setFileList] = useState<File[]>([]);

  const { setDatasToParse } = useCsvParser();

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
      // [{...},{...}]

      // Envoyer les données structurées à setDatasToParse
      setDatasToParse(resultReader);
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
    }
  };

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
