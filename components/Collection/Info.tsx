import {
  Description,
  InfoBar,
  Title,
  TopicBar,
} from "@components/Main/Collection";
import React from "react";

const Info = () => {
  return (
    <div className="flex flex-col md:justify-center  md:flex-row w-full ">
      <div className="order-last md:order-start flex flex-col justify-center md:ml-2 space-y-2 md:w-3/4 text-left p-5">
        <TopicBar topics={["Books", "Plans"]} />
        <div>
          <Title text="Books, I`d like to read in the nearest future" />
        </div>

        <Description text="These books interested me some time in the past" />
        <div className="self-center xs:self-start">
          <InfoBar
            position="end"
            quantity={100}
            owner="Masekoi"
            date="17.04.2022"
          />
        </div>
      </div>
      <div className="w-1/3 md:w-1/5 order-start md:order-last self-center">
        <img src="/chiaki-sleep.png" alt="collection avatar" />
      </div>
    </div>
  );
};

export default Info;
