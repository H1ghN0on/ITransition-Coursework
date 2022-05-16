import React from "react";
import { FormattedMessage } from "react-intl";

const NoQuery = () => {
  return (
    <div className="flex items-center">
      <span className="ml-3 text-xl text-black font-bold dark:text-white">
        <FormattedMessage id="no_query" />
      </span>
    </div>
  );
};

export default NoQuery;
