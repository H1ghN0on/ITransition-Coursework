import { NewUserContext } from "@contexts/NewUserContext";
import React from "react";
import { RegisterForm, Password, Introduce } from "@components/Auth";

enum Fragments {
  EMAIL,
  PASSWORD,
  INTRODUCE,
}

const Fragment: React.FC<{ fragment: number }> = ({ fragment }) => {
  switch (fragment) {
    case Fragments.EMAIL: {
      return <RegisterForm />;
    }

    case Fragments.PASSWORD: {
      return <Password />;
    }
    case Fragments.INTRODUCE: {
      return <Introduce />;
    }
    default: {
      return <RegisterForm />;
    }
  }
};

const FragmentSwitcher = () => {
  const userData = React.useContext(NewUserContext);
  return <Fragment fragment={userData.currentFragment} />;
};

export default FragmentSwitcher;
