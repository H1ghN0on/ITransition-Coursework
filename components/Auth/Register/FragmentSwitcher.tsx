import { NewUserContext } from "@contexts/NewUserContext";
import React from "react";
import {
  RegisterForm,
  Password,
  Introduce,
  SocialForm,
  FormFooter,
} from "@components/Auth";

enum Fragments {
  EMAIL,
  PASSWORD,
  INTRODUCE,
}

const Fragment: React.FC<{ fragment: number }> = ({ fragment }) => {
  switch (fragment) {
    case Fragments.EMAIL: {
      return (
        <form className="flex flex-col items-center w-11/12 lg:w-7/12 ">
          <SocialForm />

          <div className="border-b-2 border-b-gray-200 w-full my-3 lg:my-[50px]"></div>
          <RegisterForm />
          <FormFooter signUp />
        </form>
      );
    }

    case Fragments.PASSWORD: {
      return (
        <div className="flex flex-col items-center justify-center w-11/12 lg:w-7/12">
          <Password />
        </div>
      );
    }
    case Fragments.INTRODUCE: {
      return (
        <div className="flex flex-col items-center justify-center w-11/12 lg:w-7/12">
          <Introduce />
        </div>
      );
    }
    default: {
      return (
        <form className="flex flex-col items-center w-11/12 lg:w-7/12 ">
          <SocialForm />

          <div className="border-b-2 border-b-gray-200 w-full my-3 lg:my-[50px]"></div>
          <RegisterForm />
          <FormFooter signUp />
        </form>
      );
    }
  }
};

const FragmentSwitcher = () => {
  const userData = React.useContext(NewUserContext);
  return <Fragment fragment={userData.currentFragment} />;
};

export default FragmentSwitcher;
