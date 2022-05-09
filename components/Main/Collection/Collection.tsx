import React from "react";

import {
  Title,
  TopicBar,
  Description,
  InfoBar,
} from "@components/Main/Collection";
import { CollectionType } from "@types";

interface CollectionProps {
  data: CollectionType;
}
//FIX THE INFOBAR QUANTITY
const Collection: React.FC<CollectionProps> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center  bg-white rounded shadow-inner-md px-3">
      <div className="w-1/3 md:w-1/5">
        <img src="/chiaki-sleep.png" alt="collection avatar" />
      </div>

      <div className="flex flex-col md:ml-2 space-y-2 w-full md:w-3/4 text-center md:text-left">
        <TopicBar topics={data.topics} />
        <div>
          <Title text={data.name} />
        </div>

        <Description text={data.description} />
        <div className="self-end">
          <InfoBar
            position="end"
            quantity={data.items}
            owner={data.belongsTo.toString()}
            date={data.createdAt}
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;
