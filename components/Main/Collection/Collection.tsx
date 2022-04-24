import React from "react";

import {
  Title,
  TopicBar,
  Description,
  InfoBar,
} from "@components/Main/Collection";

const Collection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center  bg-white rounded shadow-inner-md px-3">
      <div className="w-1/3 md:w-1/5">
        <img src="/chiaki-sleep.png" alt="collection avatar" />
      </div>

      <div className="flex flex-col md:ml-2 space-y-2 w-full md:w-3/4 text-center md:text-left">
        <TopicBar topics={["Books", "Plans"]} />
        <div>
          <Title text="Books, I`d like to read in the nearest future" />
        </div>

        <Description text="These books interested me some time in the past" />
        <div className="self-end">
          <InfoBar
            position="end"
            quantity={100}
            owner="Masekoi"
            date="17.04.2022"
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;
