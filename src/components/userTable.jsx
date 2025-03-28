import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper
} from "@tanstack/react-table";
import "@/styles/userTable.css";

const UserTable = ({ data, onUpdateUser, onDeleteUser }) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("id", {
            header: "ID",
            cell: (info) => info.getValue()
        }),
        columnHelper.accessor("userName", {
            header: "Username",
            cell: (info) => info.getValue()
        }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: (info) => info.getValue()
        }),
        columnHelper.accessor("fName", {
            header: "First Name",
            cell: (info) => info.getValue()
        }),
        columnHelper.accessor("lName", {
            header: "Last Name",
            cell: (info) => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (props) => {
                const user = props.row.original;
                return (
                    <div className="action-buttons">
                        <button
                            className="update-btn"
                            onClick={() => onUpdateUser(user)}
                        >
                            UPDATE
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => onDeleteUser(user)}
                        >
                            DELETE
                        </button>
                    </div>
                );
            }
        })
    ];

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="table-container">
            <table className="user-table" border="1">
                <caption className="table-caption">Users Data</caption>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-controls">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    <span>
                        Page{" "}
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default UserTable;
