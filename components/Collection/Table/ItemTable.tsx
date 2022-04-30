import { IconSpan } from "@components/Common";

import React from "react";
import { PencilFill, Plus, TrashFill } from "react-bootstrap-icons";

import {
  useFlexLayout,
  useRowSelect,
  useRowState,
  useTable,
} from "react-table";

import { TBody, THeader } from "@components/Collection/Table";
import { ColumnData } from "@components/Collection/Table/THeader";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  addColumnToEnd,
  clearTable,
  removeRow,
  setAdditiveColumns,
  setColumnModalActive,
  setData,
  setItemModalActive,
  setRowForEdit,
} from "@redux/tableSlice";

const additiveColumns: ColumnData[] = [
  {
    name: "Memes",
    accessor: "memes",
    width: 200,
    type: "text",
  },
  {
    name: "True",
    accessor: "true",
    width: 200,
    type: "checkbox",
  },
];

const data = [
  {
    id: "1488229",
    name: "Как стать богатым и счастливым",
    tags: ["lol", "okay"],
    memes: "Nooo",
    true: "No",
  },
  {
    id: "1488227",
    name: "Как стать богатым и счастливым",
    tags: ["lol", "okay"],
    memes: "Nooo",
    true: "Yes",
  },
  {
    id: "1488228",
    name: "Как стать богатым и счастливым",
    tags: ["lol", "okay", "no", "no", "nooooo", "no", "no"],
    memes: "Nooo",
    true: "Yes",
  },
];

const ItemTable = () => {
  const tData = useAppSelector((state) => state.tableSlice);
  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    dispatch(setItemModalActive(true));
  };

  React.useEffect(() => {
    dispatch(setData(data));
    dispatch(setAdditiveColumns(additiveColumns));
    dispatch(
      addColumnToEnd({
        name: "add",
        accessor: "add",
        Header: () => (
          <IconSpan
            pointer
            className="justify-center"
            onClick={() => {
              dispatch(setColumnModalActive(true));
            }}
            icon={Plus}
            text="New column"
          />
        ),
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <div className="space-y-1">
              <IconSpan
                onClick={() => {
                  console.log(row);
                  dispatch(setRowForEdit(row.original));
                  dispatch(setItemModalActive(true));
                }}
                pointer
                icon={PencilFill}
                text="Edit"
              />
              <IconSpan
                onClick={() => {
                  if (confirm("Are you sure you want to delete row?")) {
                    dispatch(removeRow(row.original.id));
                  }
                }}
                pointer
                icon={TrashFill}
                text="Delete"
              />
            </div>
          </div>
        ),
        width: 200,
        type: "checkbox",
      })
    );
    return () => {
      dispatch(clearTable());
    };
  }, []);

  React.useEffect(() => {
    console.log(tData.data);
  }, [tData.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>(
      { columns: tData.columns, data: tData.data },
      useFlexLayout,
      useRowSelect,
      useRowState
    );

  return (
    <>
      <div className="overflow-x-auto ">
        <table
          className="w-full divide-y divide-gray-200 border border-gray"
          {...getTableProps()}
        >
          <THeader data={headerGroups} />

          <TBody tData={{ getTableBodyProps, rows, prepareRow }} />
        </table>
      </div>
      <div
        onClick={handleAddClick}
        className="flex justify-center items-center cursor-pointer p-3"
      >
        <div className="flex">
          <IconSpan
            iconClassName="font-bold text-2xl md:text-3xl "
            textClassName="font-bold text-base md:text-lg"
            text="Add item"
            icon={Plus}
          />
        </div>
      </div>
    </>
  );
};

export default ItemTable;
