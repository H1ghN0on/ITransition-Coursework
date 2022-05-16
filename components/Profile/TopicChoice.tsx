import { TopicType } from "@types";
import React from "react";
import { FormattedMessage } from "react-intl";

interface TopicChoiceProps {
  topics: TopicType[];
  onTopicClick: (value: TopicType) => void;
}

const TopicChoice: React.FC<TopicChoiceProps> = ({ topics, onTopicClick }) => {
  return (
    <div className="absolute w-full flex flex-wrap bg-[#fff] shadow-inner rounded p-3 border border-[#d8d8d8] justify-center ">
      <div className="hidden"></div>
      {topics.length != 0 ? (
        topics.map((topic: TopicType, index: number) => (
          <span
            onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
              onTopicClick(topic);
            }}
            key={index}
            className="text-sm md:text-base mr-3 cursor-pointer border border-[#d8d8d8] rounded-full bg-white px-4 py-1"
          >
            {topic.value}
          </span>
        ))
      ) : (
        <div className="flex items-center ">
          <span>
            <FormattedMessage id="no_topics" />
          </span>
        </div>
      )}
    </div>
  );
};

export default TopicChoice;
