import clsx from "clsx";
import React from "react";

interface TitleProps {
  text: string;
  unbold?: boolean;
}

const Title: React.FC<TitleProps> = ({ text, unbold }) => {
  return (
    <h1
      className={clsx("text-lg lg:text-2xl text-black truncate", {
        ["font-bold"]: !unbold,
      })}
    >
      {text}
    </h1>
  );
};

export default Title;
