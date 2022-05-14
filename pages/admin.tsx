import { Api } from "@api";
import { CustomDropdown } from "@components/Common";
import { wrapper } from "@redux/store";
import { UserType } from "@types";
import { checkUserAuth, formatDate } from "@utils";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Cell, Row, useTable } from "react-table";

interface TableProps {
  columns: any;
  data: any;
}

interface AdminProps {
  users: UserType[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table
      className="w-full divide-gray-200 border border-gray"
      {...getTableProps()}
    >
      <thead className="bg-[#F0F0F0]">
        {headerGroups.map((headerGroup, index) => (
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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  className="text-center text-sm  border-r border-gray last:border-0"
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
  );
};

const AdminPage: NextPage<AdminProps> = ({ users }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "toThePage",
        Cell: ({ row }: Cell) => (
          <Link href={`/profile/${(row.original as UserType).id}`}>
            <a className="underline text-blue-500">To the page</a>
          </Link>
        ),
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Avatar URL",
        accessor: "avatarURL",
        Cell: ({ value }: any) => (
          <Link href={value}>
            <a>{value}</a>
          </Link>
        ),
      },
      {
        Header: "VK ID",
        accessor: "vkID",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row, value }: any) => {
          const handleDropdownChange = async (option: any) => {
            await Api().setStatus(row.original.id, option.value);
          };
          const statusList = [
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
            { label: "Block", value: "block" },
          ];
          return (
            <CustomDropdown
              name="status"
              list={statusList}
              onChange={handleDropdownChange}
              defaultValue={value}
            />
          );
        },
      },
      {
        Header: "Date of registration",
        accessor: "createdAt",
        Cell: ({ value }: any) => <span>{formatDate(value)}</span>,
      },
    ],
    []
  );

  return (
    <div className="mt-5 mx-5 p-3 overflow-x-auto">
      <Table columns={columns} data={users} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  /*@ts-ignore*/
  (store) => async (ctx: GetServerSidePropsContext) => {
    await checkUserAuth(store, ctx);
    const user = store.getState().userSlice;
    if (!user || user.status !== "admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    const { users } = await Api(ctx).getAllUsers();
    return {
      props: { users }, // will be passed to the page component as props
    };
  }
);

export default AdminPage;
