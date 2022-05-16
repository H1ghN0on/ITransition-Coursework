import React from "react";

import { Title } from "@components/Main/Collection";
import TagList from "./TagList";
import { CollectionItemType } from "@types";
import Link from "next/link";
import { useIntl } from "react-intl";

interface ItemProps {
  data: CollectionItemType;
  type: "recent" | "search";
}

const AddedItem: React.FC<ItemProps> = ({ data, type }) => {
  const intl = useIntl();
  const addedToIntl = intl.formatMessage({ id: "added_to" });
  const fromIntl = intl.formatMessage({ id: "from" });

  return (
    <Link href={`/item/[id]`} as={`item/${data.id}`}>
      <div className="flex items-center  bg-white rounded shadow-inner-md p-5 dark:bg-[#3F3351] ">
        <div className="flex flex-col space-y-3 w-full">
          <TagList tags={data.tags} />
          <Title text={data.name} />

          <span className="text-sm md:text-base dark:text-white">
            {type === "recent" ? addedToIntl : fromIntl}
          </span>

          <div className="text-lg inline-flex">
            <Link
              href={`/collection/[id]`}
              as={`collection/${data.belongsTo.id}`}
            >
              <span className="cursor-pointer hover:underline dark:text-white">
                {data.belongsTo.name}
              </span>
            </Link>
          </div>

          {/* 
      <InfoBar position="center" date="17.04.2022" owner="Masekoi" /> */}
        </div>
      </div>
    </Link>
  );
};

export default AddedItem;
