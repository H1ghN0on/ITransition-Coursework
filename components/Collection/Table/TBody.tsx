/* eslint-disable react/jsx-key */
import React from "react";
import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";
import { ItemModal } from "@components/Collection/Table";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  addRow,
  setItemModalActive,
  setRowForEdit,
  updateRow,
} from "@redux/tableSlice";

interface TBodyProps {
  tData: {
    getTableBodyProps: (
      propGetter?: TableBodyPropGetter<any> | undefined
    ) => TableBodyProps;
    rows: Row<any>[];
    prepareRow: (row: Row<any>) => void;
  };
}

const TBody: React.FC<TBodyProps> = ({ tData }) => {
  const { getTableBodyProps, rows, prepareRow } = tData;

  const dispatch = useAppDispatch();
  const { isForEdit, isItemModalActive } = useAppSelector(
    (state) => state.tableSlice
  );
  const handleItemSubmitClick = (obj: any) => {
    if (isForEdit) {
      dispatch(updateRow(obj));
      dispatch(setRowForEdit(null));
    } else {
      dispatch(addRow(obj));
    }
  };

  const closeModal = () => {
    if (isForEdit) {
      dispatch(setRowForEdit(false));
    }
    dispatch(setItemModalActive(false));
  };

  return (
    <>
      {isItemModalActive && (
        <ItemModal onSubmit={handleItemSubmitClick} closeModal={closeModal} />
      )}
      <tbody
        className="bg-white divide-y divide-gray-200"
        {...getTableBodyProps()}
      >
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  className="text-center truncate text-xs px-6 py-4 whitespace-nowrap border-r border-gray last:border-0"
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default TBody;
