export const readCsv = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // use FileReader nativ Api
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log("1 - READ CSV");
      if (event.target) {
        // Récupérer le contenu du fichier chargé en tant que chaîne de caractères
        const textContent = event.target.result as string;
        //console.log("3 recup le result prommess REUSSIT ! ");
        resolve(textContent);
      } else {
        // En cas d'erreur lors de la lecture du fichier
        reject(new Error("Erreur lors de la lecture du fichier"));
      }
    };
    // gérer les erreurs de chargement du fichier
    reader.onerror = () => {
      reject(new Error("Erreur lors de la lecture du fichier"));
    };

    // Lire le contenu du fichier en tant que texte
    // console.log(" 2 je passe file dans readAsText");
    reader.readAsText(file);
  });
};
