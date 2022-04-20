import React from "react";
import Image from "next/image";
import {
  Title,
  TopicBar,
  Description,
  InfoBar,
} from "@components/Main/Collection";

const Collection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center  bg-white rounded w-2/3 md:w-1/2 shadow-inner-md px-3">
      <div className="md:w-1/4">
        <Image
          src="/chiaki-sleep.png"
          width={150}
          height={150}
          alt="collection avatar"
        />
      </div>

      <div className="flex flex-col md:ml-2 space-y-2 w-full md:w-3/4">
        <TopicBar topics={["Books", "Plans"]} />
        <div>
          <Title text="Books, I`d like to read in the nearest future" />
        </div>

        <Description text="These books interested me some time in the past" />

        <InfoBar
          position="end"
          quantity={100}
          owner="Masekoi"
          date="17.04.2022"
        />
      </div>
    </div>
  );
};

export default Collection;
