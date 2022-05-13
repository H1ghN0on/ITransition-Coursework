import React from "react";
import styled from "styled-components";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap justify-center mb-4">
      {tags &&
        tags.slice(0, 8).map((tag: string, index: number) => (
          <div
            className="text-sm md:text-base rounded-full mt-3 mr-3 px-3 border-2 shadow-inner-md"
            key={index}
          >
            {tag}
          </div>
        ))}
    </div>
  );
};

export default TagList;
