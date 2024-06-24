import { useState } from "react";

type CSVDataType = {
  set_id: string;
  _name: string;
  year: string;
  theme: string;

  [key: string]: string; // Permet des clés dynamiques
};

// Exemple d'utilisation
const csvContent = `
set_id,_name,year,theme
70904,Clayface Splat Attack,2017,Batman
70906,LEGO® Batman Movie - The Joker™ Notorious Lowrider,2017,Batman
75160,U-wing,2017,Star Wars
5004932,LEGO My Travel Companion,2017,LEGO Exclusive
10255-1,Assembly Square,2017,Modular Buildings
10257-1,Carousel,2017,Creator
10703-1,Creative Builder Box,2017,Classic
10704-1,Creative Box,2017,Classic
10706-1,Blue Creative Box,2017,Classic
`;

export default function Parser() {
  const [fileList, setFileList] = useState<File[]>([]);
  const [parsedData, setParsedData] = useState<CSVDataType[] | null>(null);
  //const [csvContent, setCsvContent] = useState<string>("");
  const [isError, setIsError] = useState<string>("");

  // fonction pour convertir chaque csv en un tableau de string
  /*   const parseCsv = (csvContent: string): string[] => {
    console.log("PARSING IN PROGRESS");
    console.log("csvContent", csvContent);

    const csvArray = csvContent.trim().split("\n");
    const csvKeys = csvArray[0].split(",");

    const parsedData = csvArray.slice(1).map((el) => {
      const rows = el.split(",");
      console.log("rows", rows);

      const newObject = {};

    });
    console.log("parsedData", parsedData);

    return csvArray;
  }; */

  const parseCsv = (csvContent: string): CSVDataType[] => {
    const [keyRow, ...rows] = csvContent.trim().split("\n");
    const keys = keyRow.split(",").map((header) => header.trim());
    console.log("keys", keys);

    return rows.map((row) => {
      const rowValues = row.split(",").map((value) => value.trim());
      return keys.reduce((obj, key, index) => {
        (obj as CSVDataType)[key] = rowValues[index];
        return obj;
      }, {} as CSVDataType);
    });
  };

  /* const generateObjectArray = (parsedCsv: string[]) => {
    console.log("generateObjetcArray");
    console.log("parsedCvs", parsedCsv);
  }; */

  //fonction pour lire les csv
  const readCsv = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log("reader", reader);

      reader.onload = (event) => {
        // true
        //console.warn("event", event);
        if (event.target) {
          //console.log("event.target", event.target);
          const csvContent = event.target.result as string;
          console.log("csvContent", csvContent);
          resolve(csvContent);
        } else {
          //false
          reject(new Error("Erreur lors de la lecture du fichier"));
        }
      };

      reader.onerror = (event) => {
        reject(new Error("Erreur lors de la lecture du fichier"));
      };

      reader.readAsText(file); // Lire le fichier en tant que texte
    });
  };

  //le traitement des fichiers peut etre long
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT", fileList);

    /*  if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    } */

    try {
      // Attendre la résolution de la promesse
      //const fileContent = await readCsv(fileList[0]);
      //console.log("fileContent", fileContent);

      // Parser le contenu CSV de readCSV
      const toto = parseCsv(csvContent);
      console.log("toto", toto);
      //const tata = generateObjectArray(toto);
      //console.warn("Données parsées :", parsedCsv);
      //setParsedData(parsedData); // Mettre à jour l'état avec les données parsées
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
    }
    /* const resultCsv = readCsv(fileList[0]);
    console.log("resultCsv =>>>", resultCsv); */
    //const formatedCsv = parseCsvToArray(csv)

    // Ajoutez ici la logique pour traiter les fichiers, par exemple :
    /*  if (fileList) {
      fileList.forEach((file) => {
        // Traitement de chaque fichier, par exemple :
        console.log("Processing file:", file.name);
        // Vous pouvez appeler votre fonction de traitement ici
        // parseCSVtoArr(file);
      });
    } */
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return; // Vérifier si files est défini

    // Convertir FileList en un tableau de File
    const filesArray = Array.from(files) as File[];
    console.log("Selected Files:", filesArray);

    // Mettre à jour fileList avec les nouveaux fichiers
    setFileList((prevFileList) => [...prevFileList, ...filesArray]);
  };
  console.log("fileList", fileList);

  return (
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
  );
}
