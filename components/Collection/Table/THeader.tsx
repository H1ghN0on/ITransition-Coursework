import { insert } from "@utils/index";
import React from "react";
import { TrashFill } from "react-bootstrap-icons";
import { ModalColumn } from "../ColumnModal";

import AddColumnModal from "../ColumnModal";
import { TableContext } from "@contexts/TableContext";

export interface ColumnData {
  name: string;
  accessor: string;
  width: number;
  maxWidth?: number;
  minWidth?: number;
  type: "text" | "checkbox" | "date" | "number" | "textarea";
}

export interface Column extends ColumnData {
  Header: (() => JSX.Element) | string;
  Cell?: (value: any) => JSX.Element;
}

interface THeaderProps {
  data: any[];
  currentColumns: any[];
}

interface EditableColumnProps {
  name: string;
}

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

export const EditableColumn: React.FC<EditableColumnProps> = ({ name }) => {
  const tableData = React.useContext(TableContext);
  const deleteSelf = () => {
    tableData.setContext({
      ...tableData,
      columns: tableData.columns.filter(
        (column) => column.accessor != name.toLowerCase()
      ),
    });
  };
  return (
    <div className="flex justify-center items-center space-x-2">
      <span>{name}</span>

      <TrashFill
        className="cursor-pointer"
        onClick={() => {
          if (confirm(`Do you want to delete ${name}`)) {
            deleteSelf();
          }
        }}
      />
    </div>
  );
};

const THeader: React.FC<THeaderProps> = ({ currentColumns, data }) => {
  const [columns, setColumns] = React.useState<Column[]>(currentColumns);
  const tableData = React.useContext(TableContext);

  React.useEffect(() => {
    setColumns(currentColumns);
  }, [currentColumns]);
  React.useEffect(() => {
    tableData.setContext({
      ...tableData,
      columns: columns,
    });
  }, [columns]);
  React.useEffect(() => {
    tableData.setContext({
      ...tableData,
      columns: [
        ...tableData.columns.slice(0, -1),
        ...additiveColumns.map((column: ColumnData) => ({
          ...column,
          Header: () => <EditableColumn name={column.name} />,
          Cell: ({ value }: any) => <span>{value}</span>,
        })),
        tableData.columns[tableData.columns.length - 1],
      ],
    });
  }, []);
  const closeModal = () => {
    tableData.setContext({
      ...tableData,
      isColumnModalActive: false,
      columns: columns,
    });
  };

  const handleColumnSubmitClick = (obj: ModalColumn) => {
    const column = {
      name: obj.name,
      Header: <EditableColumn name={obj.name} />,
      accessor: obj.name.toLowerCase(),
      minWidth: 250,
      width: 10 * obj.name.length,
      type: obj.type,

      Cell: () => <span>{obj.init}</span>,
    };

    setColumns(insert(columns, columns.length - 1, column));
  };

  return (
    <>
      {tableData.isColumnModalActive && (
        <AddColumnModal
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
