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
import { Api } from "@api";

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
  const id = useAppSelector((state) => state.collectionSlice.collection!.id);

  const { getTableBodyProps, rows, prepareRow } = tData;

  const dispatch = useAppDispatch();
  const { isForEdit, isItemModalActive } = useAppSelector(
    (state) => state.tableSlice
  );
  const handleItemSubmitClick = async (obj: any) => {
    if (isForEdit) {
      const { item } = await Api().editItem(obj);
      dispatch(updateRow(item));
      dispatch(setRowForEdit(null));
    } else {
      const { item } = await Api().createItem({
        ...obj,
        collectionId: id,
      });
      dispatch(addRow(item));
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
