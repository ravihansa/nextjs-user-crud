import React from "react";
import { useReactTable, getCoreRowModel, flexRender, } from "@tanstack/react-table";
import "@/styles/userTable.css";

const UserTable = ({ data }) => {
    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "userName", header: "Username" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "fName", header: "First Name" },
        { accessorKey: "lName", header: "Last Name" },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="table-container">
            <table className="user-table" border="1">
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
        </div>
    );
};

export default UserTable;
