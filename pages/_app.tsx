import type { AppProps } from "next/app";
import "@styles/globals.css";
import "@styles/tags.css";
import { IntlProvider } from "react-intl";
import { messages } from "@locales/messages";
import { LOCALES } from "@locales/locales";
import { wrapper } from "@redux/store";
import socket from "@core/socket";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearUser, setStatus, setTheme } from "@redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);

  React.useEffect(() => {
    dispatch(setTheme(localStorage.getItem("theme") as "dark" | "light"));
    socket.emit("connected", user?.id);
    socket.on("status-changed", (obj) => {
      toast(`Your status set to "${obj.status}". Please relogin.`);
      dispatch(clearUser());
      Cookies.remove("token");
    });
  }, []);

  React.useEffect(() => {
    if (user.theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [user.theme]);

  return (
    <IntlProvider
      messages={messages[user.locale]}
      locale={user.locale}
      defaultLocale={LOCALES.ENGLISH}
    >
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default wrapper.withRedux(MyApp);
