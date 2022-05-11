import { IconSpan, Tag } from "@components/Common";
import { Head, InfoBar, PropertyList, TagList } from "@components/Item";
import { useAppSelector } from "@redux/hooks";
import React from "react";
import { Heart } from "react-bootstrap-icons";

const Info = () => {
  const { id, name, tags, createdAt, belongsTo, info } = useAppSelector(
    (state) => state.itemSlice.item!
  );
  return (
    <div className="flex flex-col md:justify-between  md:flex-row w-full ">
      <div className="flex flex-col justify-center md:ml-2 space-y-4 md:w-3/4 text-left p-5">
        <Head from={belongsTo.toString()} name={name} />

        <PropertyList
          properties={info.map((property) => ({
            field: property.name,
            value: property.value,
          }))}
        />

        <div className="flex justify-center md:justify-start flex-wrap max-w-[60vw] gap-1">
          <TagList tags={tags} />
        </div>
        <InfoBar date={createdAt} id={id} position="start" editable={false} />
      </div>

      <div className="w-full flex justify-center md:w-1/5 self-center ">
        <IconSpan
          iconClassName={"text-black text-3xl"}
          textClassName={"text-black text-3xl"}
          icon={Heart}
          text={"28"}
        />
      </div>
    </div>
  );
};

export default Info;
