import React from "react";
import { InputLabel } from "./Input";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

interface CustomDropdownProps {
  list: {
    label: string;
    value: string;
  }[];
  label?: string;
  onChange: (arg: any) => void;
  name: string;
  defaultValue?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  list,
  label,
  onChange,
  name,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <InputLabel className=" dark:text-white " htmlFor={name}>
          {label}
        </InputLabel>
      )}
      <Dropdown
        options={list}
        onChange={onChange}
        value={defaultValue}
        placeholder="Select type"
      />
    </div>
  );
};

export default CustomDropdown;
