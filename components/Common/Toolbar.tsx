import Link from "next/link";
import React from "react";
import {
  Search,
  DoorOpen,
  BrightnessHighFill,
  DoorClosed,
} from "react-bootstrap-icons";
import { useIntl } from "react-intl";
import { IconSpan } from "@components/Common";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearUser } from "@redux/userSlice";
import Cookies from "js-cookie";
const Toolbar = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.userSlice);

  const intl = useIntl();
  const signInIntl = intl.formatMessage({ id: "sign_in" });
  const searchIntl = intl.formatMessage({ id: "search" });
  const logoutIntl = intl.formatMessage({ id: "logout" });

  const iconClassName = "text-base sm:text-lg text-black font-bold";
  const textClassName = "text-base sm:text-lg text-black  font-bold";

  const handleLogoutClick = () => {
    dispatch(clearUser());
    Cookies.remove("token");
  };

  return (
    <div className="flex space-x-5 items-center">
      {userData && userData.id != -1 ? (
        <Link href={`/profile/${userData.id}`}>
          <a>
            <span className={textClassName}>{userData.username}</span>
          </a>
        </Link>
      ) : (
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
      )}

      <IconSpan
        onClick={() => {
          console.log("Search!");
        }}
        text={searchIntl}
        icon={Search}
        textClassName={textClassName}
        iconClassName={iconClassName}
      />

      <BrightnessHighFill className={iconClassName} fill="#FFC700" />
      <object
        type="image/svg+xml"
        data="/russian-flag.svg"
        className="w-5 h-5 sm:w-7 sm:h-7"
      ></object>
      {userData && userData.id != -1 && (
        <IconSpan
          pointer
          onClick={handleLogoutClick}
          text={logoutIntl}
          icon={DoorClosed}
          textClassName={textClassName}
          iconClassName={iconClassName}
        />
      )}
    </div>
  );
};

export default Toolbar;
