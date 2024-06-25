import { useState } from "react";
import { readCsv } from "../utils/formatCsv";
import Input from "./Form/Input";
import { useCsvParser } from "../hooks/useCsvParser";

const Test1 = `part_number,name,category
10315,Brick 2 x 4,12
60583b,"Brick Special 1 x 1 x 3 with 2 Clips Vertical [Hollow Stud, Open O Clips]",5
10315f, " Brick, 2 x 4",12
10315s,"Brick 2 x 4",12
`;

const Test2 = `set_id,_name,year,theme
70904,Clayface Splat Attack,2017,Batman
70906,LEGO® Batman Movie - The Joker™ Notorious Lowrider,2017,Batman
75160,U-wing,2017,Star Wars
5004932,LEGO My Travel Companion,2017,LEGO Exclusive
10255-1,Assembly Square,2017,Modular Buildings
10257-1,Carousel,2017,Creator
10703-1,Creative Builder Box,2017,Classic
10704-1,Creative Box,2017,Classic
10706-1,Blue Creative Box,2017,Classic
`;

const Test3 = `part_num,quantity,set_id,color,_name
    10170,1,10255-1,Medium Dark Flesh,1x Pretzel
    11062,2,10255-1,White,2x Lamp Post 2 x 2 x 7 with 4 Base Flutes
    11090,8,10255-1,Yellow,8x Bar Holder with Clip
    11090,4,10255-1,Black,4x Bar Holder with Clip
    11153,2,10255-1,Light Bluish Gray,2x Slope Curved 4 x 1 No Studs [Stud Holder with Symmetric Ridges]
    11203,1,10255-1,Black,1x Tile Special 2 x 2 Inverted
    11211,73,10255-1,Tan,73x Brick Special 1 x 2 with Studs on 1 Side
    11211,2,10255-1,Black,2x Brick Special 1 x 2 with Studs on 1 Side
    11212,2,10255-1,Light Bluish Gray,2x Plate 3 x 3
    11212,2,10255-1,Dark Bluish Gray,2x Plate 3 x 3
`;

export default function CsvLoader() {
  const [fileList, setFileList] = useState<File[]>([]);

  const { parseCsv } = useCsvParser();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT");

    if (fileList.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    try {
      // Attendre la résolution de la promesse
      const csvContent = await readCsv(fileList[0]);
      console.log("csvContent FROM readCsv api =", csvContent);
      const dataParsed = parseCsv(csvContent);
      console.log("dataParsed", dataParsed);
      // Parser CSV de readCsv
      //const toto = parseCsv(csvContent);
      //console.log("toto", toto);
      //const tata = generateObjectArray(toto);
      //console.warn("Données parsées :", parsedCsv);
      //setParsedData(parsedData); // Mettre à jour l'état avec les données parsées
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
    }
    /* const resultCsv = readCsv(fileList[0]);
        console.log("resultCsv =>>>", resultCsv); */
    //const formatedCsv = parseCsvToArray(csv)
  };

  return (
    <div>
      <form id="csvForm" onSubmit={handleSubmitForm}>
        <Input setFileList={setFileList} />
        <button type="submit">SUBMIT PARSING</button>
      </form>
    </div>
  );
}
