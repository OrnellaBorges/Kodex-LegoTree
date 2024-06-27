export type InventoryPart = {
  part_num: string;
  quantity: string;
  set_id: string;
  color: string;
  _name: string;
};

export type LegoPartType = {
  part_num: string;
  _name: string;
  category: number;
  inventory_part: InventoryPart;
};

export type LegoSetType = {
  set_id: string;
  _name: string;
  year: number;
  theme: string;
  parts: LegoPartType[];
};
