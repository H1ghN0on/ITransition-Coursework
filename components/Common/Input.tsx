import { useHasMounted } from "@hooks";
import React from "react";
import { Send } from "react-bootstrap-icons";
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
  iconBtn?: boolean;
  onIconClick?: (e: React.MouseEvent) => void;
  iconClassName?: string;
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
  iconBtn,
  onIconClick,
  iconClassName,
}) => {
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex flex-col ${blockClassName} w-full`}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <div className="flex items-center">
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
        {iconBtn && <Send className={iconClassName} onClick={onIconClick} />}
      </div>
    </div>
  );
};

export default Input;
