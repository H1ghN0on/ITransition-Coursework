import type { AppProps } from "next/app";
import "@styles/globals.css";
import "@styles/tags.css";
import { IntlProvider } from "react-intl";
import { messages } from "@locales/messages";
import { LOCALES } from "@locales/locales";
import { Provider } from "react-redux";
import store, { wrapper } from "@redux/store";
import socket from "@core/socket";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setStatus } from "@redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  const locale = LOCALES.RUSSIAN;
  React.useEffect(() => {
    socket.emit("connected", user?.id);
    socket.on("status-changed", (obj) => {
      toast(`Your status set to "${obj.status}"`);
      dispatch(setStatus(obj.status));
    });
  }, []);

  return (
    <Provider store={store}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
