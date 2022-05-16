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
import { setItemsNumber } from "@redux/collectionSlice";
import Link from "next/link";
import Router from "next/router";

interface TBodyProps {
  tData: {
    getTableBodyProps: (
      propGetter?: TableBodyPropGetter<any> | undefined
    ) => TableBodyProps;
    rows: Row<any>[];
    prepareRow: (row: Row<any>) => void;
  };
  editable: boolean;
}

const TBody: React.FC<TBodyProps> = ({ tData, editable }) => {
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
      dispatch(setItemsNumber("inc"));
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
            <tr
              onClick={(e: React.MouseEvent<HTMLTableRowElement>) => {
                if (
                  (e.target as any).textContent !== "Edit" &&
                  (e.target as any).textContent !== "Delete"
                ) {
                  Router.push(`/item/${row.original.id}`);
                }
              }}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                <td
                  className="dark:bg-[#712B75] dark:text-white text-center truncate text-xs px-6 py-4 whitespace-nowrap border-r dark:border-[#46244C] last:border-0"
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
