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

export interface ColumnData {
  name: string;
  accessor: string;
  width: number;
  maxWidth?: number;
  minWidth?: number;
  type: "text" | "checkbox" | "date" | "number" | "textarea";
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
  name: string;
}

export const EditableColumn: React.FC<EditableColumnProps> = ({ name }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center items-center space-x-2">
      <span>{name}</span>

      <TrashFill
        className="cursor-pointer"
        onClick={() => {
          if (confirm(`Do you want to delete ${name}`)) {
            dispatch(removeColumn(name));
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

  const closeModal = () => {
    dispatch(setColumnModalActive(false));
  };

  const handleColumnSubmitClick = (obj: ModalColumn) => {
    const column: Column = {
      name: obj.name,
      Header: () => <EditableColumn name={obj.name} />,
      accessor: obj.name.toLowerCase(),
      minWidth: 250,
      width: 10 * obj.name.length,
      type: obj.type,
      init: obj.init,
      Cell: () => <span>{obj.init}</span>,
    };

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
