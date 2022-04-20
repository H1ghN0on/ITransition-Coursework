import { Password, RegisterForm, Introduce } from "@components/Auth";
import type { NextPage } from "next";
import React from "react";

const Register: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <RegisterForm />
    </div>
  );
};

export default Register;