import { useState, useEffect } from "react";
import "./App.css";
import { readCsv } from "./utils/formatCsv";
import { useCsvParser } from "./hooks/useCsvParser";

import CsvLoader from "./components/CsvLoader";
import LegoSetsViewer from "./components/Tree/LegoSetsViewer";

function App() {
  //const [fileList, setFileList] = useState<File[]>([]);

  /*   useEffect(() => {
    const fetchCsv = async () => {
      const response = await fetch(setsCsv);
      const text = await response.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      const data = rows.slice(1).map(row => {
        const values = row.split(',');
        const obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index].trim();
        });
        return obj;
      });
      setParsedCsvData(data);
    };

    fetchCsv();
  }, []); */

  return (
    <div className="App">
      <header className="header">
        <CsvLoader />
      </header>
      <LegoSetsViewer />
    </div>
  );
}

export default App;
