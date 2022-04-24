/* eslint-disable react/jsx-key */
import { IconSpan } from "@components/Common";
import React from "react";
import { PencilFill, Plus, TrashFill } from "react-bootstrap-icons";

import { Column, useFlexLayout, useTable } from "react-table";

const ItemTable = () => {
  const [data, setData] = React.useState([
    {
      id: "1488228",
      name: "Как стать богатым и счастливым",
      tags: ["lol", "okay"],
    },
    {
      id: "1488228",
      name: "Как стать богатым и счастливым",
      tags: ["lol", "okay"],
    },
    {
      id: "1488228",
      name: "Как стать богатым и счастливым",
      tags: ["lol", "okay", "no", "no", "nooooo", "no", "no"],
    },
  ]);

  const [columns, setColumns] = React.useState<any[]>([
    {
      Header: "ID",
      accessor: "id",
      width: 100,
    },
    {
      Header: "Name",
      accessor: "name",
      minWidth: 200,
      width: 300,
    },
    {
      Header: "Tags",
      accessor: "tags",
      width: 350,
      minWidth: 200,

      Cell: ({ value }: any) => (
        <div className="overflow-y-auto flex flex-wrap space-y-1">
          <div className="hidden"></div>
          {value &&
            value.map((tag: string, index: number) => (
              <span
                key={index}
                className="text-sm md:text-base mr-3 cursor-pointer border border-[#d8d8d8] rounded-full bg-white px-4 py-1"
              >
                {tag}
              </span>
            ))}
        </div>
      ),
    },
  ]);

  const insert = (arr: any[], index: number, newItem: Column) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index),
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({ columns, data }, useFlexLayout, (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "add",
          Header: () => (
            <IconSpan
              pointer
              className="justify-center"
              onClick={() => {
                setColumns(
                  insert(columns, columns.length - 1, {
                    Header: "Rofl",
                    accessor: "rofl",

                    width: 150,
                  })
                );
                setData(
                  data.map((value) => {
                    return {
                      ...value,
                      ["rofl"]: 0,
                    };
                  })
                );
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
        ...columns,
      ]);
    });

  const handleAddClick = () => {
    alert("Add item");
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className="w-full divide-y divide-gray-200 border border-gray"
          {...getTableProps()}
        >
          <thead className="bg-[#F0F0F0]">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

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
                      className="text-center px-6 py-4 whitespace-nowrap border-r border-gray last:border-0"
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
