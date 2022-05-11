export interface CollectionType {
  id: number;
  name: string;
  description: string;
  avatarURL: string;
  belongsTo: number;
  topics: string[];
  createdAt: string;
  items: number;
}

export interface ItemAdditiveType {
  type: "checkbox" | "text" | "string" | "date" | "number";
  name: string;
  accessor: string;
  value: any;
}
export interface CollectionItemType {
  id: number;
  belongsTo: number;
  name: string;
  tags: string[];
  createdAt: string;
  info: ItemAdditiveType[];
}
