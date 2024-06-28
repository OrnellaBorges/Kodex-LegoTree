import { ReactEventHandler, useState } from "react";
import { readCsv } from "../utils/formatCsv";
import Input from "./Form/Input";
import { DataToParseType } from "../types/csvType";

type CsvLoaderProps = {
  setDatasToParse: React.Dispatch<React.SetStateAction<DataToParseType[]>>;
};

export default function CsvLoader({ setDatasToParse }: CsvLoaderProps) {
  const [fileList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      setIsLoading(false);
      return;
    }

    try {
      const resultReader = await Promise.all(
        fileList.map(async (file) => ({
          fileName: file.name,
          content: await readCsv(file),
        }))
      );

      setDatasToParse(resultReader);
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
        <button className="button" type="submit">
          {isLoading ? "Chargement..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
