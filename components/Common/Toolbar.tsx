import Link from "next/link";
import React from "react";
import {
  Search,
  DoorOpen,
  BrightnessHighFill,
  DoorClosed,
  Moon,
  MoonFill,
  MoonStarsFill,
} from "react-bootstrap-icons";
import { useIntl } from "react-intl";
import { IconSpan, Logo } from "@components/Common";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearUser, setLocale, setTheme } from "@redux/userSlice";
import Cookies from "js-cookie";
import { LOCALES } from "@locales/locales";
const Toolbar = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.userSlice);

  const intl = useIntl();
  const signInIntl = intl.formatMessage({ id: "sign_in" });
  const searchIntl = intl.formatMessage({ id: "search" });
  const logoutIntl = intl.formatMessage({ id: "logout" });

  const iconClassName =
    "text-base sm:text-lg text-black font-bold dark:text-white cursor-pointer";
  const textClassName =
    "text-base sm:text-lg text-black  font-bold dark:text-white";

  const handleLogoutClick = () => {
    dispatch(clearUser());
    Cookies.remove("token");
  };

  const handleLocaleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userData.locale === LOCALES.ENGLISH) {
      dispatch(setLocale(LOCALES.RUSSIAN));
    } else {
      dispatch(setLocale(LOCALES.ENGLISH));
    }
  };

  const handleThemeChange = () => {
    console.log("cock");
    dispatch(setTheme(userData.theme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex space-x-5 items-center ">
      <Logo />
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
      <Link href="/search">
        <a>
          <IconSpan
            text={searchIntl}
            icon={Search}
            textClassName={textClassName}
            iconClassName={iconClassName}
          />
        </a>
      </Link>
      <div onClick={handleThemeChange}>
        {userData.theme === "light" ? (
          <BrightnessHighFill className={iconClassName} fill="#FFC700" />
        ) : (
          <MoonStarsFill className={iconClassName} />
        )}
      </div>

      <div className="cursor-pointer" onClick={handleLocaleChange}>
        {userData.locale === LOCALES.RUSSIAN ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 6"
            width="25"
            height="25"
          >
            <rect fill="#fff" width="9" height="3" />
            <rect fill="#d52b1e" y="3" width="9" height="3" />
            <rect fill="#0039a6" y="2" width="9" height="2" />
          </svg>
        ) : (
          <svg width="25" height="25" viewBox="0 0 55.2 38.4">
            <style type="text/css">{`.st0{fill:#FEFEFE;} .st1{fill:#C8102E;} .st2{fill:#012169;`}</style>
            <path
              className="st0"
              d="M2.87,38.4h49.46c1.59-0.09,2.87-1.42,2.87-3.03V3.03c0-1.66-1.35-3.02-3.01-3.03H3.01 C1.35,0.01,0,1.37,0,3.03v32.33C0,36.98,1.28,38.31,2.87,38.4L2.87,38.4z"
            />
            <polygon
              className="st1"
              points="23.74,23.03 23.74,38.4 31.42,38.4 31.42,23.03 55.2,23.03 55.2,15.35 31.42,15.35 31.42,0 23.74,0 23.74,15.35 0,15.35 0,23.03 23.74,23.03"
            />
            <path
              className="st2"
              d="M33.98,12.43V0h18.23c1.26,0.02,2.34,0.81,2.78,1.92L33.98,12.43L33.98,12.43z"
            />
            <path
              className="st2"
              d="M33.98,25.97V38.4h18.35c1.21-0.07,2.23-0.85,2.66-1.92L33.98,25.97L33.98,25.97z"
            />
            <path
              className="st2"
              d="M21.18,25.97V38.4H2.87c-1.21-0.07-2.24-0.85-2.66-1.94L21.18,25.97L21.18,25.97z"
            />
            <path
              className="st2"
              d="M21.18,12.43V0H2.99C1.73,0.02,0.64,0.82,0.21,1.94L21.18,12.43L21.18,12.43z"
            />
            <polygon className="st2" points="0,12.8 7.65,12.8 0,8.97 0,12.8" />
            <polygon
              className="st2"
              points="55.2,12.8 47.51,12.8 55.2,8.95 55.2,12.8"
            />
            <polygon
              className="st2"
              points="55.2,25.6 47.51,25.6 55.2,29.45 55.2,25.6"
            />
            <polygon className="st2" points="0,25.6 7.65,25.6 0,29.43 0,25.6" />
            <polygon
              className="st1"
              points="55.2,3.25 36.15,12.8 40.41,12.8 55.2,5.4 55.2,3.25"
            />
            <polygon
              className="st1"
              points="19.01,25.6 14.75,25.6 0,32.98 0,35.13 19.05,25.6 19.01,25.6"
            />
            <polygon
              className="st1"
              points="10.52,12.81 14.78,12.81 0,5.41 0,7.55 10.52,12.81"
            />
            <polygon
              className="st1"
              points="44.63,25.59 40.37,25.59 55.2,33.02 55.2,30.88 44.63,25.59"
            />
          </svg>
        )}
      </div>

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
