import React from "react";

const NoQuery = () => {
  return (
    <div className="flex items-center">
      <img className="w-[100px] h-[100px]" src="no.jpg" alt="no" />
      <span className="ml-3 text-xl text-black font-bold">No items?</span>
    </div>
  );
};

export default NoQuery;
