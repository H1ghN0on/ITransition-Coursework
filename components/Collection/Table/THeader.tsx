import React from "react";
import { TrashFill } from "react-bootstrap-icons";

import { ColumnModal } from "@components/Collection/Table";
import { ModalColumn } from "@components/Collection/Table/ColumnModal";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  addColumn,
  addColumnInData,
  setColumnModalActive,
} from "@redux/tableSlice";
import { Api } from "@api";
import { Editable } from "@components/Collection/Table/Headers";
import { Column } from "@types";

interface THeaderProps {
  data: any[];
  editable: boolean;
}

const THeader: React.FC<THeaderProps> = ({ data, editable }) => {
  const dispatch = useAppDispatch();
  const tData = useAppSelector((state) => state.tableSlice);
  const collectionId = useAppSelector(
    (state) => state.collectionSlice.collection!.id
  );
  const closeModal = () => {
    dispatch(setColumnModalActive(false));
  };

  const handleColumnSubmitClick = async (obj: ModalColumn) => {
    const column: Column = {
      name: obj.name,
      Header: () =>
        editable ? <Editable obj={obj} /> : <span>{obj.name}</span>,
      accessor: obj.name.toLowerCase(),
      minWidth: 250,
      width: 10 * obj.name.length,
      type: obj.type,
      init: obj.init,
      Cell: () => <span>{obj.init}</span>,
    };
    const columnToServer = {
      name: column.name,
      accessor: column.accessor,
      initValue: column.init,
      collectionId,
      type: column.type,
    };
    await Api().addColumn(columnToServer);
    dispatch(addColumn(column));
    dispatch(addColumnInData(column));
  };

  return (
    <>
      {tData.isColumnModalActive && (
        <ColumnModal
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
                className="dark:bg-[#46244C]  dark:text-white text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
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
