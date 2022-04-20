import React from "react";
import { PasswordValidationField } from "@components/Auth";
import { FormattedMessage } from "react-intl";

interface PasswordValidationProps {
  value: string;
  handleChange: (value: boolean) => void;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  value,
  handleChange,
}) => {
  const [letterValidated, setLetterValidated] = React.useState<boolean>(false);
  const [symbolValidated, setSymbolValidated] = React.useState<boolean>(false);
  const [caseValidated, setCaseValidated] = React.useState<boolean>(false);

  const passwordSymbolsPattern: RegExp = /(?=.*[@_*!])/;
  const passwordLetterCasePattern: RegExp = /(?=.*[a-z])(?=.*[A-Z])/;

  const checkLetterValidation = (): boolean => {
    const status = value.length >= 5 && value.length <= 15;
    setLetterValidated(status);
    return status;
  };

  const checkSymbolValidation = (): boolean => {
    const status = passwordSymbolsPattern.test(value);
    setSymbolValidated(status);
    return status;
  };

  const checkCaseValidation = (): boolean => {
    const status = passwordLetterCasePattern.test(value);
    setCaseValidated(status);
    return status;
  };

  const validate = () => {
    const status =
      checkLetterValidation() &&
      checkSymbolValidation() &&
      checkCaseValidation();
    handleChange(status);
  };

  React.useEffect(() => {
    validate();
  }, [value]);

  return (
    <div className="flex justify-center w-full md:w-5/6 my-5">
      <div className="flex flex-col space-y-3">
        <PasswordValidationField correct={letterValidated}>
          <FormattedMessage id="letter_validation" />
        </PasswordValidationField>
        <PasswordValidationField correct={symbolValidated}>
          <FormattedMessage id="symbol_validation" />
        </PasswordValidationField>
        <PasswordValidationField correct={caseValidated}>
          <FormattedMessage id="case_validation" />
        </PasswordValidationField>
      </div>
    </div>
  );
};

export default PasswordValidation;
