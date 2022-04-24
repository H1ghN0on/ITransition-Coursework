import React from "react";
import { Collection, AddedItem } from "@components/Main";

interface ListProps {
  title?: string;
  type: "collection" | "item";
  className?: string;
}

const List: React.FC<ListProps> = ({ title, type, className }) => {
  const Fragment = () => {
    switch (type) {
      case "collection": {
        return <Collection />;
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
        <Fragment />
        <Fragment />
        <Fragment />
      </div>
    </div>
  );
};

export default List;
