/*

API JAVASCRIPT ==== FileReader()

La fonction readCsv est une fonction asynchrone
=> prend un fichier (File) en paramètre,
=>lit son contenu en tant que texte, 
=> et retourne une promesse résolue avec le contenu du fichier 
CSV sous forme de chaîne de caractères.
*/
export const readCsv = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // use FileReader nativ Api
    const reader = new FileReader();
    console.log("reader", reader);

    reader.onload = (event) => {
      if (event.target) {
        // Récupérer le contenu du fichier chargé en tant que chaîne de caractères
        const csvContent = event.target.result as string;
        console.log("Read Csv");
        resolve(csvContent);
      } else {
        // En cas d'erreur lors de la lecture du fichier
        reject(new Error("Erreur lors de la lecture du fichier"));
      }
    };
    // Event handler pour gérer les erreurs de chargement du fichier
    reader.onerror = () => {
      reject(new Error("Erreur lors de la lecture du fichier"));
    };

    // Lire le contenu du fichier en tant que texte
    reader.readAsText(file);
  });
};
