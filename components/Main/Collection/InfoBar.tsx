import { IconSpan } from "@components/Common";
import React from "react";
import { CardText, ClockFill, PersonFill } from "react-bootstrap-icons";

interface InfoBarProps {
  date?: string;
  quantity?: number;
  owner?: string;
  position: string;
}

const InfoBar: React.FC<InfoBarProps> = ({
  date,
  quantity,
  owner,
  position,
}) => {
  const iconClassName = "text-[0.8rem]";
  const textClassName = "text-xs lg:text-sm";
  return (
    <div
      className={`flex space-x-2 md:space-x-5 justify-center md:justify-${position}`}
    >
      {quantity && (
        <IconSpan
          iconClassName={`${iconClassName} hidden md:block`}
          textClassName={`${textClassName} hidden md:block`}
          text={quantity.toString()}
          icon={CardText}
        />
      )}
      {date && (
        <IconSpan
          iconClassName={iconClassName}
          textClassName={textClassName}
          text={date}
          icon={ClockFill}
        />
      )}
      {owner && (
        <IconSpan
          iconClassName={iconClassName}
          textClassName={textClassName}
          text={owner}
          icon={PersonFill}
        />
      )}
    </div>
  );
};

export default InfoBar;
