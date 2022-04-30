import {
  Column,
  ColumnData,
  EditableColumn,
} from "@components/Collection/Table/THeader";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  isItemModalActive: boolean;
  isColumnModalActive: boolean;
  columns: Column[];
  data: any[];
  isForEdit: any;
}

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

const initialState = {
  isColumnModalActive: false,
  isItemModalActive: false,
  isForEdit: null,
  columns: initialColumns,
  data: [],
} as TableState;

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = state.data.concat(action.payload);
    },
    setAdditiveColumns(state, action: PayloadAction<ColumnData[]>) {
      state.columns = [
        ...state.columns,
        ...action.payload.map((column) => ({
          ...column,
          id: column.name,
          Header: () => <EditableColumn name={column.name} />,
          Cell: ({ value }: any) => <span>{value}</span>,
        })),
      ];
    },
    addColumnInData(state, action: PayloadAction<Column>) {
      state.data = state.data.map((row) => ({
        ...row,
        [action.payload.accessor]: action.payload.init,
      }));
    },

    addRow(state, action: PayloadAction<any[]>) {
      state.data.push(action.payload);
    },
    addColumn(state, action: PayloadAction<Column>) {
      const column = {
        ...action.payload,
        Cell: ({ value }: any) => <span>{value}</span>,
      };
      state.columns = [
        ...state.columns.slice(0, -1),
        column,
        state.columns[state.columns.length - 1],
      ];
    },

    addColumnToEnd(state, action: PayloadAction<Column>) {
      state.columns.push(action.payload);
    },

    removeColumn(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter(
        (column) => column.accessor != action.payload.toLowerCase()
      );
    },

    updateRow(state, action: PayloadAction<any>) {
      state.data = state.data.map((data) => {
        if (data.id == action.payload.id) {
          for (let field in data) {
            data[field] = action.payload[field];
          }
        }
        return data;
      });
    },

    removeRow(state, action: PayloadAction<string>) {
      state.data = state.data.filter(
        (data) => data.id != action.payload.toLowerCase()
      );
    },

    setColumnModalActive(state, action: PayloadAction<boolean>) {
      state.isColumnModalActive = action.payload;
    },

    setItemModalActive(state, action: PayloadAction<boolean>) {
      state.isItemModalActive = action.payload;
    },
    setRowForEdit(state, action: PayloadAction<any>) {
      state.isForEdit = action.payload;
    },
    clearTable(state) {
      state.columns = initialColumns;
      state.isForEdit = null;
      state.isItemModalActive = false;
      state.isColumnModalActive = false;
      state.data = [];
    },
  },
});

export const {
  setData,
  setAdditiveColumns,
  addColumnToEnd,
  addRow,
  addColumn,
  removeColumn,
  removeRow,
  updateRow,
  setColumnModalActive,
  setItemModalActive,
  addColumnInData,
  setRowForEdit,
  clearTable,
} = tableSlice.actions;
export default tableSlice.reducer;
