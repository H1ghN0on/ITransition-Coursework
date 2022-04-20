import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHasMounted } from "@hooks";
import { Button, ImageInput, Input } from "@components/Common";
import { AuthTitle } from "@styles/components";

const Password = () => {
  const intl = useIntl();

  const chooseAvatarIntl = intl.formatMessage({ id: "choose_the_avatar" });
  const usernameIntl = intl.formatMessage({ id: "username" });

  const [usernameValue, setUsernameValue] = React.useState<string>("");

  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };
  return (
    <div className="flex flex-col items-center justify-center w-11/12 lg:w-7/12">
      <AuthTitle className="text-3xl md:text-5xl md-5 md:mb-10">
        <FormattedMessage id="username_title" />
      </AuthTitle>
      <ImageInput
        width={150}
        height={150}
        imgClassName="w-2/3 h-2/3 sm:w-full h-full"
        label={chooseAvatarIntl}
        onChange={handleImageChange}
      />
      <Input
        blockClassName="m-5 w-11/12 sm:w-9/12 lg:w-5/6"
        name={"username"}
        label={usernameIntl}
        value={usernameValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsernameValue(e.target.value);
        }}
        className="text-base lg:text-xl"
        placeholder={usernameIntl}
        type="text"
      />

      <Button
        disabled={!usernameValue}
        onClick={() => {
          console.log("Hi");
        }}
        className="my-5 w-2/3 lg:w-1/2"
      >
        <FormattedMessage id="continue" />
      </Button>
    </div>
  );
};

export default Password;
