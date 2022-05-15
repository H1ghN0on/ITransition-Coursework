import { Head, InfoBar, PropertyList, TagList } from "@components/Item";
import { useAppSelector } from "@redux/hooks";
import React from "react";

import dynamic from "next/dynamic";
import Like from "./Like";
import { formatDate } from "@utils";
import { useIntl } from "react-intl";

const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview"!).then((mod) => mod.default),
  { ssr: false }
) as any;

const Info = () => {
  const intl = useIntl();

  const yesIntl = intl.formatMessage({ id: "yes" });
  const noIntl = intl.formatMessage({ id: "no" });

  const { id, name, tags, createdAt, belongsTo, info, likes } = useAppSelector(
    (state) => state.itemSlice.item!
  );

  return (
    <div className="flex flex-col md:justify-between  md:flex-row w-full ">
      <div className="flex flex-col justify-center md:ml-2 space-y-4 md:w-3/4 text-left p-5">
        <Head from={belongsTo.toString()} name={name} />

        <PropertyList
          properties={info.map((property) => {
            let value: any;
            if (property.type === "text") {
              value = <Markdown source={property.value} />;
            } else if (property.type === "date") {
              value = formatDate(value);
            } else if (property.type === "checkbox") {
              value = value === "true" ? yesIntl : noIntl;
            }
            return {
              field: property.name,
              value,
            };
          })}
        />

        <div className="flex justify-center md:justify-start flex-wrap max-w-[60vw] gap-1">
          <TagList tags={tags} />
        </div>
        <InfoBar date={createdAt} id={id} position="start" editable={false} />
      </div>

      <div className="w-full flex justify-center md:w-1/5 self-center ">
        <Like item_id={id} likes={likes} />
      </div>
    </div>
  );
};

export default Info;
