import { Button } from "@components/Common";
import Cookies from "js-cookie";
import router from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

const SocialForm = () => {
  const handleVKClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const win = window.open(
      process.env.AXIOS_BASE_URL + "/auth/vk",
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
    if (typeof user === "string" && user.includes("password")) {
      const json = JSON.parse(user);

      Cookies.set("token", json.token);
      router.push("/");
    }
  };

  React.useEffect(() => {
    window.addEventListener("message", vkAuth);
    return () => {
      window.removeEventListener("message", vkAuth);
    };
  }, []);
  return (
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
  );
};

export default SocialForm;
