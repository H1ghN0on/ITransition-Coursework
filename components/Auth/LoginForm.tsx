import { Button, Input } from "@components/Common";
import { FormFooter } from "@components/Auth";
import React from "react";
import { Facebook } from "react-bootstrap-icons";
import { FormattedMessage, useIntl } from "react-intl";
import { Axios } from "core/axios";

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
      const { data } = await Axios.post("/login", { email, password });
      if (data.status == "Error") {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVKClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const win = window.open(
      "http://localhost:3001/auth/vk",
      "Registration",
      "width=692,height=524,left"
    );

    const timer = setInterval(() => {
      if (win?.closed) {
        clearInterval(timer);
      }
    }, 100);
  };

  const vkAuth = (event: MessageEvent) => {
    const user: string = event.data;
    console.log(user);
  };

  React.useEffect(() => {
    window.addEventListener("message", vkAuth);
    return () => {
      window.removeEventListener("message", vkAuth);
    };
  }, []);

  return (
    <>
      <form className="flex flex-col items-center w-11/12 lg:w-7/12 ">
        <Button
          background="#0077FF"
          onClick={handleVKClick}
          icon
          className="my-5 w-11/12 sm:w-9/12 lg:w-4/6"
        >
          <span>
            <FormattedMessage id="sign_in_with" />
          </span>
          <svg
            className="ml-4 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z" />
          </svg>
        </Button>

        <div className="border-b-2 border-b-gray-200 w-full my-3 lg:my-[50px]"></div>
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
      </form>
      <FormFooter />
    </>
  );
};

export default LoginForm;
