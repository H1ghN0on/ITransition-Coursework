import React from "react";
import { FormattedMessage } from "react-intl";

const EmptyList = () => {
  return (
    <div className="flex items-center">
      <span className="ml-3 text-xl text-black font-bold dark:text-white">
        <FormattedMessage id="no_items" />
      </span>
    </div>
  );
};

export default EmptyList;
