/* eslint-disable react/jsx-key */
import { IconSpan } from "@components/Common";
import { THeader } from "@components/Collection";
import { insert } from "@utils/index";
import React from "react";
import { PencilFill, Plus, TrashFill } from "react-bootstrap-icons";

import { useFlexLayout, useTable } from "react-table";

import { TableContext } from "@contexts/TableContext";
import { EditableColumn } from "./THeader";

const ItemTable = () => {
  const [data, setData] = React.useState([
    {
      id: "1488228",
      name: "Как стать богатым и счастливым",
      tags: ["lol", "okay"],
      memes: "Nooo",
      true: "No",
    },
    {
      id: "1488228",
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
  ]);
  const tableData = React.useContext(TableContext);

  const handleAddClick = () => {
    console.log("add");
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>(
      { columns: tableData.columns, data },
      useFlexLayout,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "add",
            Header: () => (
              <IconSpan
                pointer
                className="justify-center"
                onClick={() => {
                  tableData.setContext({
                    ...tableData,
                    isColumnModalActive: true,
                  });
                }}
                icon={Plus}
                text="New column"
              />
            ),
            Cell: () => (
              <div className="flex justify-center">
                <div className="space-y-1">
                  <IconSpan pointer icon={PencilFill} text="Edit" />
                  <IconSpan pointer icon={TrashFill} text="Delete" />
                </div>
              </div>
            ),
          },
        ]);
      }
    );

  return (
    <>
      <div className="overflow-x-auto ">
        <table
          className="w-full divide-y divide-gray-200 border border-gray"
          {...getTableProps()}
        >
          <THeader currentColumns={tableData.columns} data={headerGroups} />

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
                      className="text-center text-xs px-6 py-4 whitespace-nowrap border-r border-gray last:border-0"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        onClick={handleAddClick}
        className="flex justify-center items-center  cursor-pointer p-3"
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
