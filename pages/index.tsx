import { Toolbar } from "@components/Common";
import { List } from "@components/Main";
import type { NextPage } from "next";
import React from "react";
import { useIntl } from "react-intl";

const Main: NextPage = () => {
  const intl = useIntl();
  const recentlyAddedIntl = intl.formatMessage({ id: "recently_added" });

  return (
    <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
      <div className="flex flex-col items-center ">
        <div className="md:self-end mb-10  px-5">
          <Toolbar />
        </div>

        <div className="flex flex-col md:flex-row space-y-[50px] md-space-x-0 xs:md:space-x-5 md:space-y-0 ">
          <List
            className="flex flex-col w-screen xs:w-full md:w-2/3 relative"
            type="collection"
          />
          <List
            className="flex flex-col w-screen xs:w-full md:w-1/3 relative"
            type="item"
            title={recentlyAddedIntl}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
