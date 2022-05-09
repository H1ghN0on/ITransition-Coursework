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

export interface CollectionItemType {
  id: number;
}
