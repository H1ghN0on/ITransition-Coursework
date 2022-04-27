import { Column, ColumnData } from "@components/Collection/Table/THeader";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
};

type Context = {
  isColumnModalActive: boolean;
  columns: Column[];
  setContext: Dispatch<SetStateAction<Context>>;
};

const initialContext: Context = {
  isColumnModalActive: false,
  columns: [
    {
      name: "id",
      Header: "ID",
      accessor: "id",
      width: 100,
      type: "number",
    },
    {
      name: "name",
      Header: "Name",
      accessor: "name",
      minWidth: 200,
      width: 300,
      type: "text",
    },

    {
      Header: "Tags",
      accessor: "tags",
      width: 350,
      minWidth: 200,
      type: "text",
      name: "tags",

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
  ],
  setContext: (): void => {
    throw new Error("setContext function must be overridden");
  },
};

const TableContext = React.createContext<Context>(initialContext);

const TableContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = React.useState<Context>(initialContext);

  return (
    <TableContext.Provider value={{ ...contextState, setContext }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableContextProvider };
