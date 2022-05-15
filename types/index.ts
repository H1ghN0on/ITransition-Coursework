export interface CollectionType {
  id: number;
  name: string;
  description: string;
  avatarURL: string;
  belongsTo: UserType;
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

export interface LikeType {
  item_id: number;
  user_id: number;
}

export interface CollectionItemType {
  id: number;
  belongsTo: CollectionType;
  name: string;
  tags: string[];
  createdAt: string;
  info: ItemAdditiveType[];
  likes: LikeType[];
  isLiked: boolean;
}

export interface CommentType {
  comment: {
    id: number;
    text: string;
    createdAt: string;
  };
  user: {
    id: number;
    username: string;
    avatarURL: string;
  };
}

export interface UserType {
  id: number;
  createdAt: string;
  status: "admin" | "user" | "block";
  username: string;
  password: string;
  vkID: number;
  avatarURL: string;
}

export interface ColumnData {
  name: string;
  accessor: string;
  width: number;
  maxWidth?: number;
  minWidth?: number;
  type: "checkbox" | "date" | "string" | "number" | "text";
  init?: any;
}

export interface Column extends ColumnData {
  Header: (() => JSX.Element) | string;
  Cell?: (value: any) => JSX.Element;
}
