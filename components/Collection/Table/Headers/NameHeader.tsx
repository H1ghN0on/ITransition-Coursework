import React from "react";
import { useIntl } from "react-intl";

const NameHeader = () => {
  const intl = useIntl();
  const nameIntl = intl.formatMessage({ id: "name" });
  return <span>{nameIntl}</span>;
};

export default NameHeader;
