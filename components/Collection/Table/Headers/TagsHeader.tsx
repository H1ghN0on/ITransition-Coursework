import React from "react";
import { useIntl } from "react-intl";

const TagsHeader = () => {
  const intl = useIntl();
  const tagsIntl = intl.formatMessage({ id: "item_tags" });
  return <span>{tagsIntl}</span>;
};

export default TagsHeader;
