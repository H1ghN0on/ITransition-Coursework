import React from "react";

interface PropertyList {
  properties: { field: string; value: string }[];
}

const PropertyList: React.FC<PropertyList> = ({ properties }) => {
  return (
    <ul className="space-y-3 text-sm md:text-base">
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
