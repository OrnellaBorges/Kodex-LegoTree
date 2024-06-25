type InputProps = {
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function Input({ setFileList }: InputProps) {
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
    <input
      id="csvInput"
      type="file"
      multiple
      accept=".csv"
      onChange={handleChange}
    />
  );
}
