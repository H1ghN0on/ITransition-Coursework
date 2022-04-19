import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

interface FormFooter {
  signUp?: boolean;
}

const FormFooter: React.FC<FormFooter> = ({ signUp }) => {
  return (
    <div className="flex">
      <span className="text-xs md:text-base">
        <FormattedMessage
          id={signUp ? "already_have_an_account" : "dont_have_an_account"}
        />
      </span>
      <Link href={signUp ? "/auth/login" : "/auth/register"}>
        <a>
          <span className="ml-2 underline underline-offset-3 text-xs md:text-base">
            <FormattedMessage id={signUp ? "sign_in" : "sign_up"} />
          </span>
        </a>
      </Link>
    </div>
  );
};

export default FormFooter;
