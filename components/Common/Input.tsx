import { useHasMounted } from "@hooks";
import React from "react";
import styled from "styled-components";

export const InputLabel = styled.label`
  font-size: 14px;
  margin-left: 7px;
`;

// const InputStyled = styled.input`
//   border: 1px solid #c7c7c7;
//   padding: 15px 20px;
//   border-radius: 5px;
//   color: #000;
// `;

// const TextareaStyled = styled.textarea`
//   border: 1px solid #c7c7c7;
//   padding: 15px 20px;
//   border-radius: 5px;
//   color: #000;
// `;

interface Input {
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  name: string;
  label?: string;
  width?: string;
  height?: string;
  className?: string;
  blockClassName?: string;
  textarea?: boolean;
  checked?: boolean;
  type: "password" | "text" | "number" | "checkbox" | "date" | "number";
}

const Input: React.FC<Input> = ({
  value,
  placeholder,
  onChange,
  name,
  label,
  blockClassName,
  className,
  textarea,
  type,
  checked,
}) => {
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex flex-col ${blockClassName}`}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      {textarea ? (
        <textarea
          onChange={onChange}
          placeholder={placeholder}
          id={name}
          value={value}
          className={`border border-[#c7c7c7] outline-none px-[15px] py-[20px] rounded text-black ${className}`}
          name={name}
        />
      ) : (
        <input
          className={`border border-[#c7c7c7] outline-none px-[15px] py-[20px] rounded text-black ${className}`}
          onChange={onChange}
          placeholder={placeholder}
          id={name}
          value={value}
          checked={checked}
          type={type}
          name={name}
        />
      )}
    </div>
  );
};

export default Input;
