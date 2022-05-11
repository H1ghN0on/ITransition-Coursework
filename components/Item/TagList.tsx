import { Tag } from "@components/Common";
import React from "react";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <>{tags && tags.map((tag, index) => <Tag key={index} text={tag} />)}</>
  );
};

export default TagList;
