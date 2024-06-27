import { ParsedData } from "../../types/csvType";

type LegoSetsViewerProps = {
  parsedData: ParsedData;
};
export default function LegoTree({ parsedData }: LegoSetsViewerProps) {
  console.log("JJJJJJJ ", parsedData);

  return (
    <main>
      <h2>Lego Tree</h2>
      <ul></ul>
    </main>
  );
}
