import { Info, ItemTable } from "@components/Collection";
import { ProfileBrief, Toolbar } from "@components/Common";
import { TableContextProvider } from "@contexts/TableContext";
import { NextPage } from "next";
import React from "react";

const CollectionInfo: NextPage = () => {
  return (
    <TableContextProvider>
      <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
        <div className="flex flex-col items-center w-screen  space-y-3">
          <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-between mb-10">
            <ProfileBrief imageSrc={"/avatar.jpg"} name="H1ghN0on_" />
            <Toolbar />
          </div>
          <div className="w-4/5 md:w-2/3 flex flex-col bg-white rounded shadow-inner md:px-5 truncate  ">
            <div>
              <Info />
            </div>
            <div className="mt-3">
              <ItemTable />
            </div>
          </div>
        </div>
      </div>
    </TableContextProvider>
  );
};

export default CollectionInfo;
