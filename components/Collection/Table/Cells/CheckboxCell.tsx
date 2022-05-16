import { useIntl } from "react-intl";

const CheckboxCell = ({ value }: any) => {
  const intl = useIntl();
  const yesIntl = intl.formatMessage({ id: "yes" });
  const noIntl = intl.formatMessage({ id: "no" });

  if (typeof value === "boolean") {
    value = value ? yesIntl : noIntl;
  } else if (typeof value === "string") {
    value = value === "true" ? yesIntl : noIntl;
  }

  return <span>{value}</span>;
};

export default CheckboxCell;
