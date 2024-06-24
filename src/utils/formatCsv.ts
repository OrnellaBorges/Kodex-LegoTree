//fonction pour lire les csv
export const readCsv = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log("reader", reader);

    reader.onload = (event) => {
      if (event.target) {
        //console.log("event.target", event.target);
        const csvContent = event.target.result as string;
        console.log("Read Csv");
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
