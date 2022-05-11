import { IconSpan, Tag } from "@components/Common";
import { Head, InfoBar, PropertyList, TagList } from "@components/Item";
import React from "react";
import { Heart } from "react-bootstrap-icons";

const Info = () => {
  return (
    <div className="flex flex-col md:justify-between  md:flex-row w-full ">
      <div className="flex flex-col justify-center md:ml-2 space-y-4 md:w-3/4 text-left p-5">
        <Head
          from="Books, I'd like to read in the future"
          name="I feel tres bon"
        />

        <PropertyList
          properties={[
            { field: "Author", value: "Михаил Соболев" },
            { field: "Author", value: "Михаил Соболев" },
            { field: "Author", value: "Михаил Соболев" },
          ]}
        />

        <div className="flex justify-center md:justify-start flex-wrap max-w-[60vw] gap-1">
          <TagList
            tags={["One", "Shot", "One", "Kill", "One", "Shot", "One", "Kill"]}
          />
        </div>
        <InfoBar
          owner={"Masekoi"}
          date={"2011-08-12T20:17:46.384Z"}
          id={1}
          position="start"
          editable={true}
        />
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
