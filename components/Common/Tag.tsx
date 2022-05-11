import React from "react";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="text-xs md:text-xs mr-3 cursor-pointer border border-[#d8d8d8] rounded-full bg-white px-4 py-1">
      {text}
    </span>
  );
};

export default Tag;
