import type { AppProps } from "next/app";
import "@styles/globals.css";
import { IntlProvider } from "react-intl";
import { messages } from "@locales/messages";
import { LOCALES } from "@locales/locales";

function MyApp({ Component, pageProps }: AppProps) {
  const locale = LOCALES.RUSSIAN;

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale={LOCALES.ENGLISH}
    >
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;
