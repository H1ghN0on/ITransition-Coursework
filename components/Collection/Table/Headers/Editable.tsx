import { Api } from "@api";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { removeColumn } from "@redux/tableSlice";
import { TrashFill } from "react-bootstrap-icons";
import { useIntl } from "react-intl";
import { ModalColumn } from "../ColumnModal";

interface EditableProps {
  obj: ModalColumn;
}

const Editable: React.FC<EditableProps> = ({ obj }) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const deleteWarningIntl = intl.formatMessage({ id: "delete_warning" });
  const collectionId = useAppSelector(
    (state) => state.collectionSlice.collection!.id
  );
  return (
    <div className="flex justify-center items-center space-x-2">
      <span>{obj.name}</span>

      <TrashFill
        className="cursor-pointer"
        onClick={async () => {
          if (confirm(`${deleteWarningIntl} ${obj.name}?`)) {
            await Api().deleteColumn({
              collectionId,
              accessor: obj.name.toLowerCase(),
              type: obj.type,
            });
            dispatch(removeColumn(obj.name));
          }
        }}
      />
    </div>
  );
};

export default Editable;
