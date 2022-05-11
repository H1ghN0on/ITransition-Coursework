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
import { Column, ColumnData } from "@components/Collection/Table/THeader";
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
import { useIntl } from "react-intl";
import { CollectionItemType } from "@types";
import { Api } from "@api";
import { setItemsNumber } from "@redux/collectionSlice";

interface ItemTable {
  additiveColumns: ColumnData[];
  initItems: CollectionItemType[];
}

const ItemTable: React.FC<ItemTable> = ({ additiveColumns, initItems }) => {
  const intl = useIntl();

  const nameIntl = intl.formatMessage({ id: "name" });
  const tagsIntl = intl.formatMessage({ id: "item_tags" });

  const initialColumns: Column[] = [
    {
      name: "ID",
      Header: "ID",
      accessor: "id",
      width: 100,
      type: "number",
    },
    {
      name: "Name",
      Header: nameIntl,
      accessor: "name",
      minWidth: 200,
      width: 300,
      type: "text",
    },

    {
      Header: tagsIntl,
      accessor: "tags",
      width: 350,
      minWidth: 200,
      type: "text",
      name: "Tags",
      Cell: ({ value }: any) => (
        <div className="overflow-y-auto flex flex-wrap space-y-1">
          <div className="hidden"></div>
          {value &&
            value.map((tag: string, index: number) => (
              <span
                key={index}
                className="text-xs md:text-xs mr-3 cursor-pointer border border-[#d8d8d8] rounded-full bg-white px-4 py-1"
              >
                {tag}
              </span>
            ))}
        </div>
      ),
    },
  ];

  const addItemIntl = intl.formatMessage({ id: "add_item" });
  const newColumnIntl = intl.formatMessage({ id: "new_column" });
  const editIntl = intl.formatMessage({ id: "edit" });
  const deleteIntl = intl.formatMessage({ id: "delete" });
  const deleteWarningIntl = intl.formatMessage({ id: "delete_warning" });

  const tData = useAppSelector((state) => state.tableSlice);
  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    dispatch(setItemModalActive(true));
  };

  React.useEffect(() => {
    dispatch(setData(initItems));
    dispatch(
      setAdditiveColumns({ init: initialColumns, add: additiveColumns })
    );
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
            text={newColumnIntl}
          />
        ),
        Cell: ({ row }) => (
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
                  if (
                    confirm(deleteWarningIntl + " '" + row.original.name + "'?")
                  ) {
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
        ),
        width: 200,
        type: "checkbox",
      })
    );
    return () => {
      dispatch(clearTable());
    };
  }, []);

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
          className="w-full divide-gray-200 border border-gray"
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
            text={addItemIntl}
            icon={Plus}
          />
        </div>
      </div>
    </>
  );
};

export default ItemTable;
