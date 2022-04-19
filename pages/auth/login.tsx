import { FormFooter, LoginForm } from "@components/Auth";
import type { NextPage } from "next";
import React from "react";

const Login: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <LoginForm />
      <FormFooter />
    </div>
  );
};

export default Login;
