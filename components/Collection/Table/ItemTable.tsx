import { IconSpan, Tag } from "@components/Common";

import React from "react";
import { PencilFill, Plus, TrashFill } from "react-bootstrap-icons";

import {
  useFlexLayout,
  useRowSelect,
  useRowState,
  useTable,
} from "react-table";

import { TBody, THeader } from "@components/Collection/Table";
import { Column, ColumnData } from "@types";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  addColumnToEnd,
  clearTable,
  setAdditiveColumns,
  setData,
  setItemModalActive,
} from "@redux/tableSlice";
import { useIntl } from "react-intl";
import { CollectionItemType } from "@types";
import { EditCell, TagCell } from "./Cells";
import { Addable } from "@components/Collection/Table/Headers";

interface ItemTable {
  additiveColumns: ColumnData[];
  initItems: CollectionItemType[];
  editable: boolean;
}

const ItemTable: React.FC<ItemTable> = ({
  additiveColumns,
  initItems,
  editable,
}) => {
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
      type: "string",
    },

    {
      Header: tagsIntl,
      accessor: "tags",
      width: 350,
      minWidth: 200,
      type: "text",
      name: "Tags",
      Cell: TagCell,
    },
  ];

  const addItemIntl = intl.formatMessage({ id: "add_item" });

  const tData = useAppSelector((state) => state.tableSlice);
  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    dispatch(setItemModalActive(true));
  };

  React.useEffect(() => {
    dispatch(setData(initItems));
    dispatch(
      setAdditiveColumns({
        init: initialColumns,
        add: additiveColumns,
        editable,
      })
    );
    if (editable) {
      dispatch(
        addColumnToEnd({
          name: "add",
          accessor: "add",
          Header: Addable,
          Cell: EditCell,
          width: 200,
          type: "checkbox",
        })
      );
    }

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
          <THeader editable={editable} data={headerGroups} />

          <TBody
            editable={editable}
            tData={{ getTableBodyProps, rows, prepareRow }}
          />
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
