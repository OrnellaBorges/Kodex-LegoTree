export const readCsv = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // use FileReader nativ Api
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log("1 - READ CSV");
      if (event.target) {
        // Récupérer le contenu du fichier chargé en tant que chaîne de caractères
        const textContent = event.target.result as string;

        resolve(textContent);
      } else {
        reject(new Error("Erreur lors de la lecture du fichier"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Erreur lors de la lecture du fichier"));
    };

    reader.readAsText(file);
  });
};
