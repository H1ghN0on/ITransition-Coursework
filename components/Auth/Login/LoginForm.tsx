import { Button, Input } from "@components/Common";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Cookies from "js-cookie";
import router from "next/router";
import { Api } from "@api";

const LoginForm = () => {
  const intl = useIntl();

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const emailIntl = intl.formatMessage({ id: "email" });
  const passwordIntl = intl.formatMessage({ id: "password" });

  const [input, setInput] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await loginUser();
    setLoading(false);
  };

  const loginUser = async () => {
    try {
      const { email, password } = input;
      const data = await Api().login({ email, password });
      if (data.status == "Error") {
        setError(true);
      } else {
        Cookies.set("token", data.userData.token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && (
        <span className="text-sm text-red-600">
          <FormattedMessage id="user_not_found" />
        </span>
      )}
      <Input
        blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
        name="email"
        label={emailIntl}
        value={input.email}
        onChange={handleInputChange}
        className="text-base lg:text-xl"
        placeholder={emailIntl}
        type="text"
      />

      <Input
        blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
        name="password"
        label={passwordIntl}
        value={input.password}
        onChange={handleInputChange}
        className="text-base lg:text-xl"
        placeholder={passwordIntl}
        type="password"
      />

      <Button
        disabled={!input.email.trim() || !input.password.trim() || isLoading}
        onClick={handleSubmitClick}
        className="my-5 w-11/12 sm:w-9/12 lg:w-4/6"
      >
        {isLoading ? (
          <FormattedMessage id="processing" />
        ) : (
          <FormattedMessage id="sign_in" />
        )}
      </Button>
    </>
  );
};

export default LoginForm;
