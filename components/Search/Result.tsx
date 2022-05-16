import { List } from "@components/Main";
import { CollectionItemType } from "@types";
import React from "react";
import { EmptyList, NoQuery } from "@components/Search";

interface ResultProps {
  items: CollectionItemType[] | null;
}

const Result: React.FC<ResultProps> = ({ items }) => {
  if (!items) {
    return <NoQuery />;
  }
  if (items.length == 0) {
    return <EmptyList />;
  }
  return (
    <div className=" w-[50vw]">
      <List editable={false} type="search-item" items={items} />
    </div>
  );
};

export default Result;
