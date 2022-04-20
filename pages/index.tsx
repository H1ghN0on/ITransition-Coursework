import { AddedItem, Collection } from "@components/Main/";
import type { NextPage } from "next";
import React from "react";

const Main: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <AddedItem />
    </div>
  );
};

export default Main;
