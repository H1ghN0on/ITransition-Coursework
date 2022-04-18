import type { NextPage } from "next";
import { FormattedMessage } from "react-intl";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <FormattedMessage id="username" />
    </div>
  );
};

export default Home;
