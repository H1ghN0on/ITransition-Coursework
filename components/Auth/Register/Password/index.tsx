import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { PasswordValidation } from "@components/Auth";
import { useHasMounted } from "@hooks";
import { Button, Input } from "@components/Common";
import { AuthTitle } from "@styles/components";
import { NewUserContext } from "@contexts/NewUserContext";

const Password = () => {
  const intl = useIntl();
  const newUserContext = React.useContext(NewUserContext);

  const passwordIntl = intl.formatMessage({ id: "password" });

  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [correct, setCorrect] = React.useState<boolean>(false);

  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentFragment = newUserContext.currentFragment;
    e.preventDefault();
    newUserContext.setContext({
      ...newUserContext,
      password: passwordValue,
      currentFragment: currentFragment + 1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-11/12 lg:w-7/12">
      <AuthTitle className="text-3xl md:text-5xl md-5 md:mb-10">
        <FormattedMessage id="password_title" />
      </AuthTitle>
      <Input
        blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
        name="password"
        label={passwordIntl}
        value={passwordValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPasswordValue(e.target.value.replace(" ", ""));
        }}
        className="text-base lg:text-xl"
        placeholder={passwordIntl}
        type="password"
      />
      <PasswordValidation value={passwordValue} handleChange={setCorrect} />
      <Button
        disabled={!correct}
        onClick={handleSubmitClick}
        className="my-5 w-2/3 lg:w-1/2"
      >
        <FormattedMessage id="continue" />
      </Button>
    </div>
  );
};

export default Password;
