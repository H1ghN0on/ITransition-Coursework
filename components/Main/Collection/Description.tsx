import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h3 className="text-sm lg:text-base truncate dark:text-white">{text}</h3>
  );
};

export default Title;
