import React from "react";

import { InfoBar, Title } from "@components/Main/Collection";
import TagList from "./TagList";

const AddedItem = () => {
  return (
    <div className="flex items-center  bg-white rounded shadow-inner-md p-5 ">
      <div className="flex flex-col space-y-3 w-full">
        <TagList tags={["Lag", "Train", "Holy", "東京"]} />
        <Title text="Interesting Book" />

        <span className="text-sm md:text-base ">added to</span>

        <Title unbold text="Books, I`d to like read in the nearest future" />

        <InfoBar position="center" date="17.04.2022" owner="Masekoi" />
      </div>
    </div>
  );
};

export default AddedItem;
