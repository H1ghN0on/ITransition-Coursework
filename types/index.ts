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

interface LikeType {
  item_id: number;
  user_id: number;
}

export interface CollectionItemType {
  id: number;
  belongsTo: number;
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
