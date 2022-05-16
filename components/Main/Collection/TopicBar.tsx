import { IconSpan } from "@components/Common";
import React from "react";
import { CircleFill } from "react-bootstrap-icons";

interface TopicBarProps {
  topics: string[];
}

const TopicBar: React.FC<TopicBarProps> = ({ topics }) => {
  const iconClassName = "text-[0.4rem] lg:text-[0.5rem] dark:text-white";
  const textClassName =
    "text-sm lg:text-base text-[#333] font-bold dark:text-white  mr-3";
  return (
    <div className="flex justify-center md:justify-start truncate flex-wrap">
      {topics &&
        topics.map((topic: string, index: number) => (
          <IconSpan
            key={index}
            textClassName={textClassName}
            iconClassName={iconClassName}
            text={topic}
            icon={CircleFill}
          />
        ))}
    </div>
  );
};

export default TopicBar;
