import Link from "next/link";
import React from "react";
import { Search, DoorOpen, BrightnessHighFill } from "react-bootstrap-icons";
import { useIntl } from "react-intl";
import { IconSpan } from "@components/Common";
const Toolbar = () => {
  const intl = useIntl();
  const signInIntl = intl.formatMessage({ id: "sign_in" });
  const searchIntl = intl.formatMessage({ id: "search" });

  const iconClassName = "text-base sm:text-lg text-black font-bold";
  const textClassName = "text-base sm:text-lg text-black  font-bold";
  return (
    <div className="flex space-x-5 items-center">
      <IconSpan
        onClick={() => {
          console.log("Search!");
        }}
        text={searchIntl}
        icon={Search}
        textClassName={textClassName}
        iconClassName={iconClassName}
      />
      <Link href="/auth/login">
        <a>
          <IconSpan
            textClassName={textClassName}
            text={signInIntl}
            icon={DoorOpen}
            iconClassName={iconClassName}
          />
        </a>
      </Link>

      <BrightnessHighFill className={iconClassName} fill="#FFC700" />
      <object
        type="image/svg+xml"
        data="/russian-flag.svg"
        className="w-5 h-5 sm:w-7 sm:h-7"
      ></object>
    </div>
  );
};

export default Toolbar;
