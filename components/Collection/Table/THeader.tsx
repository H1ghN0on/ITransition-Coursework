import React from "react";
import { TrashFill } from "react-bootstrap-icons";

import { ColumnModal } from "@components/Collection/Table";
import { ModalColumn } from "@components/Collection/Table/ColumnModal";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  addColumn,
  addColumnInData,
  removeColumn,
  setColumnModalActive,
} from "@redux/tableSlice";
import { useIntl } from "react-intl";
import { Api } from "@api";

export interface ColumnData {
  name: string;
  accessor: string;
  width: number;
  maxWidth?: number;
  minWidth?: number;
  type: "checkbox" | "date" | "string" | "number" | "text";
  init?: any;
}

export interface Column extends ColumnData {
  Header: (() => JSX.Element) | string;
  Cell?: (value: any) => JSX.Element;
}

interface THeaderProps {
  data: any[];
}

interface EditableColumnProps {
  obj: ModalColumn;
}

export const EditableColumn: React.FC<EditableColumnProps> = ({ obj }) => {
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

const THeader: React.FC<THeaderProps> = ({ data }) => {
  // const tableData = React.useContext(TableContext);
  const dispatch = useAppDispatch();
  const tData = useAppSelector((state) => state.tableSlice);
  const collectionId = useAppSelector(
    (state) => state.collectionSlice.collection!.id
  );
  const closeModal = () => {
    dispatch(setColumnModalActive(false));
  };

  const handleColumnSubmitClick = async (obj: ModalColumn) => {
    const column: Column = {
      name: obj.name,
      Header: () => <EditableColumn obj={obj} />,
      accessor: obj.name.toLowerCase(),
      minWidth: 250,
      width: 10 * obj.name.length,
      type: obj.type,
      init: obj.init,
      Cell: () => <span>{obj.init}</span>,
    };
    const columnToServer = {
      name: column.name,
      accessor: column.accessor,
      initValue: column.init,
      collectionId,
      type: column.type,
    };
    await Api().addColumn(columnToServer);
    dispatch(addColumn(column));
    dispatch(addColumnInData(column));
  };

  return (
    <>
      {tData.isColumnModalActive && (
        <ColumnModal
          onSubmit={handleColumnSubmitClick}
          closeModal={closeModal}
        />
      )}
      <thead className="bg-[#F0F0F0]">
        {data.map((headerGroup, index: number) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, index: number) => (
              <th
                key={index}
                className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    </>
  );
};

export default THeader;
