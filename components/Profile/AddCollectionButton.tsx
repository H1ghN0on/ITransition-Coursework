import { IconSpan } from "@components/Common";
import { setModal } from "@redux/collectionsSlice";
import { useAppDispatch } from "@redux/hooks";
import React from "react";
import { Plus } from "react-bootstrap-icons";
import { useIntl } from "react-intl";

interface AddCollectionButtonProps {
  editable: boolean;
}

const AddCollectionButton: React.FC<AddCollectionButtonProps> = ({
  editable,
}) => {
  const intl = useIntl();

  const dispatch = useAppDispatch();
  const handleAddClick = () => {
    dispatch(setModal(true));
  };

  const addCollectionIntl = intl.formatMessage({ id: "add_collection" });

  return editable ? (
    <div
      onClick={handleAddClick}
      className="flex justify-center items-center bg-white rounded shadow-inner-md py-5 w-2/3 cursor-pointer dark:bg-[#3F3351]"
    >
      <div className="flex">
        <IconSpan
          iconClassName="text-black font-bold text-xl md:text-3xl dark:text-white"
          textClassName="text-black font-bold text-base md:text-xl dark:text-white"
          text={addCollectionIntl}
          icon={Plus}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddCollectionButton;
