import { useState } from "react";
import "./App.css";
import { readCsv } from "./utils/formatCsv";
import { useCsvParser } from "./hooks/useCsvParser";

function App() {
  const [fileList, setFileList] = useState<File[]>([]);

  const { parsedCsvData, isError, isLoading, handleFiles } = useCsvParser();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT", fileList);

    /*  if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    } */

    try {
      // Attendre la résolution de la promesse
      const fileContent = await readCsv(fileList[0]);
      console.log("fileContent", fileContent);
      // Parser le contenu CSV de readCSV
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convertir FileList en un tableau de File
    const filesArray = Array.from(files) as File[];
    console.log("Selected Files:", filesArray);

    // Mettre à jour fileList avec les nouveaux fichiers
    setFileList((prevFileList) => [...prevFileList, ...filesArray]);
  };

  return (
    <div className="App">
      <header className="header">
        <div>
          <form id="csvForm" onSubmit={handleSubmitForm}>
            <input
              id="csvInput"
              type="file"
              multiple
              accept=".csv"
              onChange={handleChange}
            />
            <button type="submit">PARSE</button>
          </form>

          <ul className="fileList">
            {fileList?.map((file, index) => (
              <li key={`${file.name}-${index}`}>{file.name}</li>
            ))}
          </ul>
        </div>
      </header>

      <div>Tree here</div>
    </div>
  );
}

export default App;
