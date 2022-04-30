import type { AppProps } from "next/app";
import "@styles/globals.css";
import "@styles/tags.css";
import { IntlProvider } from "react-intl";
import { messages } from "@locales/messages";
import { LOCALES } from "@locales/locales";
import { Provider } from "react-redux";
import store from "redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  const locale = LOCALES.RUSSIAN;

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

export default MyApp;
