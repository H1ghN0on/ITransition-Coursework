import React from "react";
import { useIntl } from "react-intl";

interface PropertyList {
  properties: { field: string; value: string }[];
}

const PropertyList: React.FC<PropertyList> = ({ properties }) => {
  const intl = useIntl();

  return (
    <ul className="space-y-3 text-sm md:text-base dark:text-white">
      {properties.map((property, index) => (
        <li key={index}>
          <span>
            {property.field}: {property.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PropertyList;
