import "./App.css";

import CsvLoader from "./components/CsvLoader";
import LegoSetsViewer from "./components/Tree/LegoSetsViewer";

function App() {
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
