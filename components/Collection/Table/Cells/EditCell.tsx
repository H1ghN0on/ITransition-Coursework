import { Api } from "@api";
import { IconSpan, Tag } from "@components/Common";
import { setItemsNumber } from "@redux/collectionSlice";
import { useAppDispatch } from "@redux/hooks";
import {
  removeRow,
  setItemModalActive,
  setRowForEdit,
} from "@redux/tableSlice";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { useIntl } from "react-intl";

const EditCell = ({ row }: any) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const editIntl = intl.formatMessage({ id: "edit" });
  const deleteIntl = intl.formatMessage({ id: "delete" });
  const deleteWarningIntl = intl.formatMessage({ id: "delete_warning" });

  return (
    <div className="flex justify-center">
      <div className="space-y-1">
        <IconSpan
          onClick={() => {
            dispatch(setRowForEdit(row.original));
            dispatch(setItemModalActive(true));
          }}
          pointer
          icon={PencilFill}
          text={editIntl}
        />
        <IconSpan
          onClick={async () => {
            if (confirm(deleteWarningIntl + " '" + row.original.name + "'?")) {
              await Api().deleteItem(row.original.id);
              dispatch(setItemsNumber("dec"));
              dispatch(removeRow(row.original.id));
            }
          }}
          pointer
          icon={TrashFill}
          text={deleteIntl}
        />
      </div>
    </div>
  );
};

export default EditCell;
