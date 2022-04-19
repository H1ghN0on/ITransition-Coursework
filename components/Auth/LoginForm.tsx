import { Button, Input } from "@components/Common";
import React from "react";
import { Facebook } from "react-bootstrap-icons";
import { FormattedMessage, useIntl } from "react-intl";

const LoginForm = () => {
  const intl = useIntl();

  const usernameIntl = intl.formatMessage({ id: "username" });
  const passwordIntl = intl.formatMessage({ id: "password" });

  const [inputValue, setInputValue] = React.useState<string>("");
  return (
    <form className="flex flex-col items-center w-11/12 lg:w-7/12 ">
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
        name="Username"
        label={usernameIntl}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
        className="text-base lg:text-xl"
        placeholder={usernameIntl}
        type="text"
      />

      <Input
        blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
        name="password"
        label={passwordIntl}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
        className="text-base lg:text-xl"
        placeholder={passwordIntl}
        type="password"
      />

      <Button
        onClick={() => {
          console.log("Hi");
        }}
        className="my-5 w-11/12 sm:w-9/12 lg:w-4/6"
      >
        <FormattedMessage id="sign_in" />
      </Button>
    </form>
  );
};

export default LoginForm;
