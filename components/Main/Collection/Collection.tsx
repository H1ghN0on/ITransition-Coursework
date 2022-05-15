import React from "react";

import {
  Title,
  TopicBar,
  Description,
  InfoBar,
} from "@components/Main/Collection";
import { CollectionType } from "@types";
import { useAppSelector } from "@redux/hooks";
import Link from "next/link";

interface CollectionProps {
  data: CollectionType;
}

const Collection: React.FC<CollectionProps> = ({ data }) => {
  const user = useAppSelector((state) => state.userSlice);
  const isEditable =
    (user && user.id === data.belongsTo.id) || user.status === "admin";

  return (
    <Link href={`/collection/[id]`} as={`/collection/${data.id}`}>
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
              id={data.id}
              position="end"
              quantity={data.items.toString()}
              owner={data.belongsTo}
              date={data.createdAt}
              editable={isEditable}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Collection;
