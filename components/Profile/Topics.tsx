import React from "react";
import { TopicChoice } from "@components/Profile";
import styled from "styled-components";
import { Plus } from "react-bootstrap-icons";
import { IconSpan } from "@components/Common";
import { FormattedMessage, useIntl } from "react-intl";

const TopicLabel = styled.label`
  font-size: 14px;
  margin-left: 7px;
`;

interface TopicsProps {
  topics: string[];
  onTopicClick: (type: "add" | "remove", value: string) => void;
  activeTopics: string[];
}

const Topics: React.FC<TopicsProps> = ({
  topics,
  onTopicClick,
  activeTopics,
}) => {
  const intl = useIntl();
  const addTopicIntl = intl.formatMessage({ id: "add_topic" });
  const [isChoiceActive, setChoiceActive] = React.useState<boolean>(false);
  return (
    <div>
      <TopicLabel>
        <FormattedMessage id="topics" />
      </TopicLabel>
      <div className="flex space-y-2 space-x-3 flex-wrap justify-center items-center relative">
        <div className="hidden"></div>
        {activeTopics &&
          activeTopics.map((topic: string, index: number) => (
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                onTopicClick("remove", topic);
              }}
              key={index}
              className="border border-[#d8d8d8] rounded-full bg-white px-4 py-1 cursor-pointer text-sm md:text-base"
            >
              {topic}
            </div>
          ))}
        {activeTopics.length != 0 ? (
          <Plus
            onClick={() => {
              setChoiceActive(!isChoiceActive);
            }}
            className={`border text-2xl border-[#d8d8d8] rounded-full bg-white relative cursor-pointer`}
          />
        ) : (
          <IconSpan
            onClick={() => {
              setChoiceActive(!isChoiceActive);
            }}
            pointer
            iconClassName={"text-2xl border border-[#d8d8d8] rounded-full"}
            icon={Plus}
            text={addTopicIntl}
          />
        )}

        <div className="relative w-full">
          {isChoiceActive && (
            <TopicChoice
              onTopicClick={(topic: string) => {
                onTopicClick("add", topic);
              }}
              topics={topics.filter(
                (topic: string) => !activeTopics.includes(topic)
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Topics;
