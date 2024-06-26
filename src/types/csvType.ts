export type Set = {
  set_id: string;
  _name: string;
  year: string;
  theme: string;
};
export type Part = {
  part_num: string;
  _name: string;
  category: number;
};

export type Inventory = {
  part_num: string;
  quantity: string;
  set_id: string;
  color: string;
  _name: string;
};

export type MergedData = {
  sets_id: string;
  _name: string;
  year: string;
  parts: Part[];
  inventory: Inventory[];
};

export type ParsedData = {
  sets: Set[];
  parts: Part[];
  inventory: Inventory[];
};

export type LEGOSet = Set & {
  parts: Array<{
    part_num: string;
    _name: string;
    category: number;
    quantity: number;
    color: string;
  }>;
};

export type CSVParsedDataType = {
  [key: string]: string | number;
};
