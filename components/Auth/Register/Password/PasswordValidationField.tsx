import clsx from "clsx";
import React from "react";
import { Check, X } from "react-bootstrap-icons";

interface PasswordValidationFieldProps {
  correct: boolean;
  children: React.ReactNode;
}
const PasswordValidationField: React.FC<PasswordValidationFieldProps> = ({
  correct,
  children,
}) => {
  return (
    <div
      className={clsx("flex items-center", {
        ["text-red-500"]: !correct,
      })}
    >
      {correct ? (
        <Check className="mr-1 md:mr-3 text-2xl lg:text-3xl ml-4" />
      ) : (
        <X className="mr-1 md:mr-3 text-2xl lg:text-3xl ml-4" />
      )}
      <span className="text-base md:text-xl ml-4">{children}</span>
    </div>
  );
};

export default PasswordValidationField;
