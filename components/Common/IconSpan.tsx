import React from "react";
import { Icon } from "react-bootstrap-icons";

interface IconSpanProps {
  text: string;
  icon: Icon;
  iconClassName?: string;
  textClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const IconSpan: React.FC<IconSpanProps> = ({
  text,
  icon,
  iconClassName,
  textClassName,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="flex items-center">
      {React.createElement(icon, {
        className: `${iconClassName} mr-1 md:mr-2`,
      })}
      <span className={textClassName}>{text}</span>
    </div>
  );
};

export default IconSpan;
