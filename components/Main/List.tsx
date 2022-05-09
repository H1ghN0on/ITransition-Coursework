import React from "react";
import { Collection, AddedItem } from "@components/Main";
import { CollectionItemType, CollectionType } from "@types";

interface ListProps {
  title?: string;
  type: "collection" | "item";
  className?: string;
  items: CollectionType[] | CollectionItemType[];
}

const List: React.FC<ListProps> = ({ title, type, className, items }) => {
  const Fragment: React.FC<{ data: CollectionType | CollectionItemType }> = ({
    data,
  }) => {
    switch (type) {
      case "collection": {
        return <Collection data={data as CollectionType} />;
      }
      case "item": {
        return <AddedItem />;
      }
      default: {
        return null;
      }
    }
  };
  return (
    <div className={className}>
      {title && (
        <h6 className="self-center absolute -top-6 text-black font-bold">
          {title}
        </h6>
      )}
      <div className="flex flex-col space-y-3 w-full">
        {items && items.map((data) => <Fragment key={data.id} data={data} />)}
      </div>
    </div>
  );
};

export default List;
