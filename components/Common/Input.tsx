import { useHasMounted } from "@hooks";
import React from "react";
import styled from "styled-components";

const InputLabel = styled.label`
  font-size: 14px;
  margin-left: 7px;
`;

const InputStyled = styled.input`
  border: 1px solid #c7c7c7;
  padding: 15px 20px;
  border-radius: 5px;
  color: #000;
`;

interface Input {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  width?: string;
  height?: string;
  className?: string;
  blockClassName?: string;
  type: "password" | "text" | "number";
}

const Input: React.FC<Input> = ({
  value,
  placeholder,
  onChange,
  name,
  label,
  blockClassName,
  className,

  type,
}) => {
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex flex-col ${blockClassName}`}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <InputStyled
        onChange={onChange}
        placeholder={placeholder}
        id={name}
        value={value}
        className={className}
        type={type}
      />
    </div>
  );
};

export default Input;
