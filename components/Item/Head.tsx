import { Title } from "@components/Main/Collection";
import React from "react";
import { useIntl } from "react-intl";

interface HeadProps {
  from: string;
  name: string;
}

const Head: React.FC<HeadProps> = ({ from, name }) => {
  const fromIntl = useIntl().formatMessage({ id: "from" });
  return (
    <>
      <div>
        {fromIntl} <span className="underline">{from}</span>
      </div>

      <div>
        <Title text={name} />
      </div>
    </>
  );
};

export default Head;
