import type { NextPage } from "next";
import React from "react";
import { FragmentSwitcher } from "@components/Auth";
import { NewUserContextProvider } from "@contexts/NewUserContext";
import { Logo } from "@components/Common";

const Register: NextPage = () => {
  return (
    <NewUserContextProvider>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <Logo className="text-5xl" />
        <FragmentSwitcher />
      </div>
    </NewUserContextProvider>
  );
};

export default Register;
