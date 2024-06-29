import { ReactEventHandler, useState } from "react";
import { readCsv } from "../utils/formatCsv";
import Input from "./Form/Input";
import { DataToParseType } from "../types/csvType";
import { Button } from "./Buttons/Button";

type CsvLoaderProps = {
  setDatasToParse: React.Dispatch<React.SetStateAction<DataToParseType[]>>;
};

export default function CsvLoader({ setDatasToParse }: CsvLoaderProps) {
  const [fileList, setFileList] = useState<File[]>([]); // lui recupère les csv via l'input
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("fileList", fileList);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      setIsLoading(false);
      return;
    }

    try {
      // resultReader renvoit un tableau d'objet [{fileName: "sets.csv", content: `contenu en text brut`}]
      const resultReaderArray = await Promise.all(
        // boucle sur le tableau fileList

        // pour chaque file il va creer un objet => {fileName: "sets.csv", content:`contenu en texte brute`}
        fileList.map(async (file) => {
          // retirer le .csv
          const fileName = file.name.replace(".csv", "");
          // le contenu du csv est envoyé dans la fonction readCsv
          const content = await readCsv(file);

          return { fileName, content };
        })
      );

      setDatasToParse(resultReaderArray);
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
    } finally {
      setIsLoading(false);
      setFileList([]); // vider fileList
    }
  };

  return (
    <div>
      <form id="csvForm" onSubmit={handleSubmitForm}>
        <Input setFileList={setFileList} />
        <Button type={"submit"}>
          {isLoading ? "Chargement..." : "SUBMIT"}
        </Button>
        {/* <button className="button" type="submit">
          {isLoading ? "Chargement..." : "SUBMIT"}
        </button> */}
      </form>
    </div>
  );
}
