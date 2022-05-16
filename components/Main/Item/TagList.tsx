import { Tag } from "@components/Common";
import React from "react";
import styled from "styled-components";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap justify-center mb-4 dark:text-white">
      {tags &&
        tags
          .slice(0, 8)
          .map((tag: string, index: number) => <Tag text={tag} key={index} />)}
    </div>
  );
};

export default TagList;
