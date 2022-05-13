import React from "react";

import { InfoBar, Title } from "@components/Main/Collection";
import TagList from "./TagList";
import { CollectionItemType } from "@types";
import Link from "next/link";

interface ItemProps {
  data: CollectionItemType;
  type: "recent" | "search";
}

const AddedItem: React.FC<ItemProps> = ({ data, type }) => {
  return (
    <Link href={`/item/${data.id}`}>
      <a>
        {" "}
        <div className="flex items-center  bg-white rounded shadow-inner-md p-5 ">
          <div className="flex flex-col space-y-3 w-full">
            <TagList tags={data.tags} />
            <Title text={data.name} />

            <span className="text-sm md:text-base ">
              {type === "recent" ? "added to" : "from"}
            </span>

            <span className="text-lg ">{data.belongsTo.toString()}</span>
            {/* 
      <InfoBar position="center" date="17.04.2022" owner="Masekoi" /> */}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AddedItem;
