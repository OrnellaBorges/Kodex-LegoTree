type InputProps = {
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function Input({ setFileList }: InputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("files", files);

    if (files) {
      // stocker dans filesArray chaque files recu dans untableau
      const filesArray = Array.from(files) as File[];
      console.log("Selected Files:", filesArray);
      //Maj le state fileList via le setter du CsvLoader passé en props
      setFileList((prevFileList) => {
        console.log("Previous:", prevFileList);
        const updatedFileList = [...prevFileList, ...filesArray];
        console.log("Updated:", updatedFileList);
        return updatedFileList;
      });
    }

    // Ne pas réinitialiser l'input pour permettre de sélectionner plusieurs fois le même fichier
    // e.target.value = "";

    // Réinitialisation facultative de l'input pour des besoins spécifiques
    // e.target.value = "";
  };

  return (
    <div>
      <label className="lable">
        <input
          className="input"
          id="csvInput"
          type="file"
          multiple
          accept=".csv"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
