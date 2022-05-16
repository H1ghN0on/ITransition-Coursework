import type { AppProps } from "next/app";
import "@styles/globals.css";
import "@styles/tags.css";
import { IntlProvider } from "react-intl";
import { messages } from "@locales/messages";
import { LOCALES } from "@locales/locales";
import { Provider } from "react-redux";
import { wrapper } from "@redux/store";
import socket from "@core/socket";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setStatus, setTheme } from "@redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);

  React.useEffect(() => {
    dispatch(setTheme(localStorage.getItem("theme") as "dark" | "light"));
    socket.emit("connected", user?.id);
    socket.on("status-changed", (obj) => {
      toast(`Your status set to "${obj.status}"`);
      dispatch(setStatus(obj.status));
    });
  }, []);

  React.useEffect(() => {
    console.log("what");
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
