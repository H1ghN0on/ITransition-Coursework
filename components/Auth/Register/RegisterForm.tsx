import { Button, Input } from "@components/Common";
import { FormFooter } from "@components/Auth";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { NewUserContext } from "@contexts/NewUserContext";
import { Axios } from "core/axios";

const RegisterForm = () => {
  const intl = useIntl();
  const newUserContext = React.useContext(NewUserContext);

  const emailIntl = intl.formatMessage({ id: "email" });

  const [error, setError] = React.useState<boolean>(false);
  const [emailValue, setEmailValue] = React.useState<string>("");

  const [emailValidated, setEmailValidated] = React.useState<boolean>(false);
  const emailPattern: RegExp = /^\S+@\S+\.\S+$/;

  const checkEmailValidation = (value: string) => {
    setEmailValidated(emailPattern.test(value));
  };

  const checkEmailExistence = async (email: string) => {
    const { data } = await Axios.post("/check-email", {
      email: emailValue,
    });
    if (data.status === "Error") {
      setError(true);
    }

    return data.status !== "Error";
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    newUserContext.setContext({
      ...newUserContext,
      isLoading: true,
    });

    const currentFragment = newUserContext.currentFragment;
    setError(false);
    e.preventDefault();

    const status = await checkEmailExistence(emailValue);
    if (status) {
      newUserContext.setContext({
        ...newUserContext,
        email: emailValue,
        currentFragment: currentFragment + 1,
        isLoading: false,
      });
    } else {
      newUserContext.setContext({
        ...newUserContext,
        isLoading: false,
      });
    }
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
        </Button>

        <div className="border-b-2 border-b-gray-200 w-full my-3 lg:my-[50px]"></div>
        {error && (
          <span className="text-sm text-red-600">
            <FormattedMessage id="email_exists" />
          </span>
        )}
        <Input
          blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
          name="email"
          label={emailIntl}
          value={emailValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailValue(e.target.value);
            checkEmailValidation(e.target.value);
          }}
          className="text-base lg:text-xl"
          placeholder={emailIntl}
          type="text"
        />

        <Button
          disabled={!emailValidated || newUserContext.isLoading}
          onClick={handleSubmitClick}
          className="my-5 w-11/12 sm:w-9/12 lg:w-4/6"
        >
          {newUserContext.isLoading ? (
            <FormattedMessage id="processing" />
          ) : (
            <FormattedMessage id="sign_up" />
          )}
        </Button>
      </form>
      <FormFooter signUp />
    </>
  );
};

export default RegisterForm;
