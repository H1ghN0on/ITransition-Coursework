import clsx from "clsx";
import React from "react";
import { Icon } from "react-bootstrap-icons";

interface IconSpanProps {
  text: string;
  icon: Icon;
  iconClassName?: string;
  textClassName?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  pointer?: boolean;
}

const IconSpan: React.FC<IconSpanProps> = ({
  text,
  icon,
  iconClassName,
  textClassName,
  onClick,
  className,
  pointer,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx("flex items-center", className, {
        ["cursor-pointer"]: pointer,
      })}
    >
      {React.createElement(icon, {
        className: `${iconClassName} mr-1 md:mr-2`,
      })}
      <span className={textClassName}>{text}</span>
    </div>
  );
};

export default IconSpan;
