import {
  CheckboxCell,
  DateCell,
  TextCell,
} from "@components/Collection/Table/Cells";
import { Column, ColumnData } from "@types";
import { Editable } from "@components/Collection/Table/Headers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  isItemModalActive: boolean;
  isColumnModalActive: boolean;
  columns: Column[];
  data: any[];
  isForEdit: any;
}

const initialState = {
  isColumnModalActive: false,
  isItemModalActive: false,
  isForEdit: null,
  columns: [],
  data: [],
} as TableState;

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = state.data.concat(action.payload);
    },
    setAdditiveColumns(
      state,
      action: PayloadAction<{
        init: Column[];
        add: ColumnData[];
        editable: boolean;
      }>
    ) {
      state.columns = [
        ...action.payload.init,
        ...action.payload.add.map((column) => ({
          ...column,
          id: column.name,
          Header: () =>
            action.payload.editable ? (
              <Editable
                obj={{ name: column.name, type: column.type, init: "" }}
              />
            ) : (
              <span>{column.name}</span>
            ),
          Cell: ({ value }: any) => {
            if (column.type === "date") {
              return <DateCell value={value} />;
            }
            if (column.type === "checkbox") {
              return <CheckboxCell value={value} />;
            }
            if (column.type === "text") {
              return <TextCell value={value} />;
            }
            return <span>{value}</span>;
          },
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

        Cell: ({ value }: any) => {
          if (column.type === "date") {
            return <DateCell value={value} />;
          }
          if (action.payload.type === "checkbox") {
            return <CheckboxCell value={value} />;
          }
          if (action.payload.type === "text") {
            return <TextCell value={value} />;
          }
          return <span>{value}</span>;
        },
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

    removeRow(state, action: PayloadAction<number>) {
      state.data = state.data.filter((data) => data.id != action.payload);
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
      state.columns = [];
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
