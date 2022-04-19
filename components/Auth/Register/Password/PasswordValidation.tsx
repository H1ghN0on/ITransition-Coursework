import React from "react";
import { PasswordValidationField } from "@components/Auth";
import { FormattedMessage } from "react-intl";

const PasswordValidation = () => {
  return (
    <div className="flex justify-center w-full md:w-5/6 my-5">
      <div className="flex flex-col space-y-3">
        <PasswordValidationField correct={false}>
          <FormattedMessage id="letter_validation" />
        </PasswordValidationField>
        <PasswordValidationField correct>
          <FormattedMessage id="symbol_validation" />
        </PasswordValidationField>
        <PasswordValidationField correct>
          <FormattedMessage id="case_validation" />
        </PasswordValidationField>
      </div>
    </div>
  );
};

export default PasswordValidation;
