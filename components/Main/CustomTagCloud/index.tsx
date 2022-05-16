import React from "react";
import TagOfCloud from "./TagOfCloud";
import { TagCloud } from "react-tagcloud";

interface TagCloudProps {
  tags: any[];
}

const CustomTagCloud: React.FC<TagCloudProps> = ({ tags }) => {
  return (
    <TagCloud
      minSize={5}
      maxSize={12}
      tags={tags}
      renderer={TagOfCloud}
      colorOptions={{ luminosity: "dark", hue: "green" }}
      className="text-center bg-white mb-10 py-5 px-[20%] rounded-full dark:bg-[#3F3351]"
    />
  );
};

export default CustomTagCloud;
