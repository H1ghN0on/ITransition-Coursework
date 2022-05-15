import { FormFooter, LoginForm, SocialForm } from "@components/Auth";
import { Logo } from "@components/Common";
import type { NextPage } from "next";
import React from "react";

const Login: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Logo className="text-5xl" />
      <form className="flex flex-col items-center w-11/12 lg:w-7/12 ">
        <SocialForm />
        <div className="border-b-2 border-b-gray-200 w-full my-3 lg:my-[50px]"></div>
        <LoginForm />

        <FormFooter />
      </form>
    </div>
  );
};

export default Login;
