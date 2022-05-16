import {
  Description,
  InfoBar,
  Title,
  TopicBar,
} from "@components/Main/Collection";
import { useAppSelector } from "@redux/hooks";
import React from "react";

const Info = () => {
  const {
    items,
    belongsTo,
    createdAt,
    name,
    description,
    id,
    topics,
    avatarURL,
  } = useAppSelector((state) => state.collectionSlice.collection!);
  return (
    <div className="flex flex-col md:justify-center  md:flex-row w-full  ">
      <div className="order-last md:order-start flex flex-col justify-center md:ml-2 space-y-2 md:w-3/4 text-left p-5">
        <TopicBar topics={topics} />
        <div>
          <Title text={name} />
        </div>

        <Description text={description} />
        <div className="self-center xs:self-start">
          <InfoBar
            id={id}
            editable={false}
            position="end"
            quantity={items.toString()}
            owner={belongsTo}
            date={createdAt}
          />
        </div>
      </div>
      <div className="w-1/3 md:w-1/5 order-start md:order-last self-center">
        <img src={avatarURL} alt="collection avatar" />
      </div>
    </div>
  );
};

export default Info;
