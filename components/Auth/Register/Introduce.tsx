import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHasMounted } from "@hooks";
import { Button, ImageInput, Input } from "@components/Common";
import { AuthTitle } from "@styles/components";
import { NewUserContext } from "@contexts/NewUserContext";
import { Axios } from "core/axios";
import Cookies from "js-cookie";

const Password = () => {
  const intl = useIntl();
  const newUserContext = React.useContext(NewUserContext);

  const chooseAvatarIntl = intl.formatMessage({ id: "choose_the_avatar" });
  const usernameIntl = intl.formatMessage({ id: "username" });

  const [error, setError] = React.useState<boolean>(false);
  const [usernameValue, setUsernameValue] = React.useState<string>("");
  const [imageValue, setImageValue] = React.useState<null | File>(null);

  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageValue(e.target.files[0]);
    }
  };

  const createUser = async () => {
    const formData = new FormData();
    formData.append("username", usernameValue);
    formData.append("password", newUserContext.password);
    formData.append("email", newUserContext.email);
    formData.append("avatar", imageValue ?? "");

    try {
      const { data } = await Axios.post("/create-user", formData);
      if (data.status === "Error") {
        setError(true);
      } else {
        Cookies.set("token", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError(false);
    e.preventDefault();
    newUserContext.setContext({
      ...newUserContext,
      username: usernameValue,
      image: imageValue,
      isLoading: true,
    });

    await createUser();
    newUserContext.setContext({
      ...newUserContext,
      isLoading: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-11/12 lg:w-7/12">
      <AuthTitle className="text-3xl md:text-5xl md-5 md:mb-10">
        <FormattedMessage id="username_title" />
      </AuthTitle>
      {error && (
        <span className="text-sm text-red-600">
          <FormattedMessage id="username_exists" />
        </span>
      )}
      <ImageInput
        rounded
        width={150}
        height={150}
        imgClassName="w-2/3 h-2/3 sm:w-full h-full"
        label={chooseAvatarIntl}
        onChange={handleImageChange}
        name="avatar"
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
        disabled={!usernameValue.trim() || newUserContext.isLoading}
        onClick={handleSubmitClick}
        className="my-5 w-2/3 lg:w-1/2"
      >
        {newUserContext.isLoading ? (
          <FormattedMessage id="processing" />
        ) : (
          <FormattedMessage id="continue" />
        )}
      </Button>
    </div>
  );
};

export default Password;
