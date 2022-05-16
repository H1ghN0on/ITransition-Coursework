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
import { useIntl } from "react-intl";

interface CollectionProps {
  data: CollectionType;
  editable: boolean;
}

const Collection: React.FC<CollectionProps> = ({ editable, data }) => {
  const intl = useIntl();
  const user = useAppSelector((state) => state.userSlice);
  const isEditable =
    editable &&
    ((user && user.id === data.belongsTo.id) || user.status === "admin");

  return (
    <Link href={`/collection/[id]`} as={`/collection/${data.id} `}>
      <div className="flex flex-col md:flex-row justify-center items-center  bg-white rounded shadow-inner-md px-10 p-3  dark:bg-[#3F3351]">
        <div className="w-1/3 md:w-1/5">
          <img src={data.avatarURL} alt="collection avatar" />
        </div>

        <div className="flex flex-col md:ml-2 space-y-2 w-full md:w-3/4 text-center md:text-left">
          <TopicBar
            topics={data.topics.map((topic) =>
              intl.formatMessage({ id: topic })
            )}
          />
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
