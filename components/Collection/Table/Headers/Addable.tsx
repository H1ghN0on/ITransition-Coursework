import { IconSpan } from "@components/Common";
import { useAppDispatch } from "@redux/hooks";
import { setColumnModalActive } from "@redux/tableSlice";
import { Plus } from "react-bootstrap-icons";
import { useIntl } from "react-intl";

const Addable = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const newColumnIntl = intl.formatMessage({ id: "new_column" });
  return (
    <IconSpan
      pointer
      className="justify-center"
      onClick={() => {
        dispatch(setColumnModalActive(true));
      }}
      icon={Plus}
      text={newColumnIntl}
    />
  );
};

export default Addable;
