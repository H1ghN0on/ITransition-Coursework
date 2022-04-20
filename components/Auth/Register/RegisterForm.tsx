import { Button, Input } from "@components/Common";
import { FormFooter } from "@components/Auth";
import React from "react";
import { Facebook } from "react-bootstrap-icons";
import { FormattedMessage, useIntl } from "react-intl";

const RegisterForm = () => {
  const intl = useIntl();

  const emailIntl = intl.formatMessage({ id: "email" });

  const [emailValue, setEmailValue] = React.useState<string>("");

  const [emailValidated, setEmailValidated] = React.useState<boolean>(false);
  const emailPattern: RegExp = /^\S+@\S+\.\S+$/;

  const checkEmailValidation = () => {
    setEmailValidated(emailPattern.test(emailValue));
  };

  return (
    <>
      <form className="flex flex-col items-center justify-center w-11/12 lg:w-7/12">
        <Button
          background="#0077FF"
          onClick={() => {
            console.log("Hi");
          }}
          icon
          className="my-5 w-11/12 sm:w-9/12 lg:w-4/6"
        >
          <span>
            <FormattedMessage id="sign_in_with" />
          </span>
          <Facebook className="text-base md:text-xl lg:text-2xl ml-4" />
        </Button>

        <div className="border-b-2 border-b-gray-200 w-full my-3 lg:my-[50px]"></div>

        <Input
          blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
          name="email"
          label={emailIntl}
          value={emailValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailValue(e.target.value);
            checkEmailValidation();
          }}
          className="text-base lg:text-xl"
          placeholder={emailIntl}
          type="text"
        />

        <Button
          disabled={!emailValidated}
          onClick={() => {
            console.log("Hi");
          }}
          className="my-5 w-11/12 sm:w-9/12 lg:w-4/6"
        >
          <FormattedMessage id="sign_up" />
        </Button>
      </form>
      <FormFooter signUp />
    </>
  );
};

export default RegisterForm;