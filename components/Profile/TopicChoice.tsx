import React from "react";
import { FormattedMessage } from "react-intl";

interface TopicChoiceProps {
  topics: string[];
  onTopicClick: (value: string) => void;
}

const TopicChoice: React.FC<TopicChoiceProps> = ({ topics, onTopicClick }) => {
  return (
    <div className="absolute w-full flex flex-wrap bg-[#fff] shadow-inner rounded p-3 border border-[#d8d8d8] justify-center ">
      <div className="hidden"></div>
      {topics.length != 0 ? (
        topics.map((topic: string, index: number) => (
          <span
            onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
              onTopicClick(topic);
            }}
            key={index}
            className="text-sm md:text-base mr-3 cursor-pointer border border-[#d8d8d8] rounded-full bg-white px-4 py-1"
          >
            {topic}
          </span>
        ))
      ) : (
        <div className="flex items-center ">
          <img className="w-[50px] h-[50px] mr-3" src="/no.jpg" alt="no?"></img>
          <span>
            <FormattedMessage id="no_topics" />
          </span>
        </div>
      )}
    </div>
  );
};

export default TopicChoice;
