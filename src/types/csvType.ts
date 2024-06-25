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
  quantity: number;
  set_id: string;
  color: string;
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
