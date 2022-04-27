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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  label?: string;
  width?: string;
  height?: string;
  className?: string;
  blockClassName?: string;
  textarea?: boolean;
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
  onTextareaChange,
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
          onChange={onTextareaChange}
          placeholder={placeholder}
          id={name}
          value={value}
          className={`border border-[#c7c7c7] px-[15px] py-[20px] rounded text-black ${className}`}
          name={name}
        />
      ) : (
        <input
          className={`border border-[#c7c7c7] px-[15px] py-[20px] rounded text-black ${className}`}
          onChange={onChange}
          placeholder={placeholder}
          id={name}
          value={value}
          type={type}
          name={name}
        />
      )}
    </div>
  );
};

export default Input;
