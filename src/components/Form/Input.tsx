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

    setFileList((prevFileList) => {
      console.log("Previous File List:", prevFileList);
      const updatedFileList = [...prevFileList, ...filesArray];
      console.log("Updated File List:", updatedFileList);
      return updatedFileList;
    });
    e.target.value = ""; // ??POURQUOI
  };

  return (
    <label>
      <input
        id="csvInput"
        type="file"
        multiple
        accept=".csv"
        onChange={handleChange}
      />
    </label>
  );
}
