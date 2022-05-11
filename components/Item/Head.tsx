import { Title } from "@components/Main/Collection";
import React from "react";

interface HeadProps {
  from: string;
  name: string;
}

const Head: React.FC<HeadProps> = ({ from, name }) => {
  return (
    <>
      <div>
        From <span className="underline">{from}</span>
      </div>

      <div>
        <Title text={name} />
      </div>
    </>
  );
};

export default Head;
