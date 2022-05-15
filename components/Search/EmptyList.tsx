import React from "react";
import { FormattedMessage } from "react-intl";

const EmptyList = () => {
  return (
    <div className="flex items-center">
      <img className="w-[100px] h-[100px]" src="no.jpg" alt="no" />
      <span className="ml-3 text-xl text-black font-bold">
        <FormattedMessage id="no_items" />
      </span>
    </div>
  );
};

export default EmptyList;
