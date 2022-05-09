import { Api } from "@api";
import { IconSpan } from "@components/Common";
import {
  removeCollection,
  setForEdit,
  setModal,
} from "@redux/collectionsSlice";
import { useAppDispatch } from "@redux/hooks";
import { formatDate } from "@utils";
import React from "react";
import {
  CardText,
  ClockFill,
  PencilFill,
  PersonFill,
  TrashFill,
} from "react-bootstrap-icons";
import { useIntl } from "react-intl";

interface InfoBarProps {
  id: number;
  date?: string;
  quantity?: string;
  owner?: string;
  position: string;
  editable: boolean;
}

const InfoBar: React.FC<InfoBarProps> = ({
  id,
  date,
  quantity,
  owner,
  position,
  editable,
}) => {
  const dispatch = useAppDispatch();

  const intl = useIntl();
  const editIntl = intl.formatMessage({ id: "edit" });
  const deleteIntl = intl.formatMessage({ id: "delete" });

  const iconClassName = "text-[0.8rem]";
  const textClassName = "text-xs lg:text-sm";

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setForEdit(id));
    dispatch(setModal(true));
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this collection?")) {
      await Api().deleteCollection(id);
      dispatch(removeCollection(id));
    }
  };

  return (
    <div
      className={`flex flex-col items-center xs:flex-row space-x-2 md:space-x-5 justify-center md:justify-${position} truncate`}
    >
      {quantity && (
        <IconSpan
          iconClassName={`${iconClassName} hidden md:block`}
          textClassName={`${textClassName} hidden md:block`}
          text={quantity}
          icon={CardText}
        />
      )}
      {date && (
        <IconSpan
          iconClassName={iconClassName}
          textClassName={textClassName}
          text={formatDate(date)}
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
      {editable && (
        <IconSpan
          onClick={handleEditClick}
          iconClassName={iconClassName}
          textClassName={textClassName}
          className={"cursor-pointer"}
          text={editIntl}
          icon={PencilFill}
        />
      )}

      {editable && (
        <IconSpan
          onClick={handleDeleteClick}
          iconClassName={iconClassName}
          textClassName={textClassName}
          className={"cursor-pointer"}
          text={deleteIntl}
          icon={TrashFill}
        />
      )}
    </div>
  );
};

export default InfoBar;
