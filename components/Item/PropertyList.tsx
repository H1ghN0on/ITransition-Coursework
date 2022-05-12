import React from "react";
import { useIntl } from "react-intl";

interface PropertyList {
  properties: { field: string; value: string }[];
}

const PropertyList: React.FC<PropertyList> = ({ properties }) => {
  const intl = useIntl();
  const yesIntl = intl.formatMessage({ id: "yes" });
  const noIntl = intl.formatMessage({ id: "no" });

  return (
    <ul className="space-y-3 text-sm md:text-base">
      {properties.map((property, index) => (
        <li key={index}>
          <span>
            {property.field}:{" "}
            {typeof property.value === "boolean"
              ? property.value
                ? yesIntl
                : noIntl
              : property.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PropertyList;
