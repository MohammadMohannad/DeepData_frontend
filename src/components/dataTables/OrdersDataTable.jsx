"use client";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronsLeftRight,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "../container/Container";
import CustomerOrders from "../customerModals/CustomerOrders";
import CustomerEditModal from "../customerModals/CustomerEdit";
import { Badge } from "../ui/badge";
import OrderStatus from "../ordersModals/OrderStatus";

const columns = ({ setOpenOrderStatusModal, setOrder }) => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="p-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="p-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "الاسم كامل",
    cell: ({ row }) => {
      return <div className="cursor-pointer">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "platform",
    header: "المنصة",
    cell: ({ row }) => <div>{row.getValue("platform")}</div>,
  },
  {
    accessorKey: "date",
    header: "التاريخ",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "city",
    header: "المحافظة",
    cell: ({ row }) => <div>{row.getValue("city")}</div>,
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <div className="w-full h-full text-center">
        <Badge
          className={`h-8 px-4 rounded-md ${
            row.getValue("status") === "ملغى"
              ? "bg-[#FFE5E7] text-red-500 hover:bg-red-300"
              : "bg-[#C8FFE1] text-[#00B112] hover:bg-green-300"
          }`}
        >
          {row.getValue("status")}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "الاجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="right">
            <DropdownMenuLabel>الاجراءات</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <Edit size={18} />
              <p>تعديل</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                setOrder(order);
                setOpenOrderStatusModal(true);
              }}
            >
              <ChevronsLeftRight size={18} />
              <p>تغير حالة الطلب</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Delete ${order.id}: ${order.name}`)}
              className="cursor-pointer flex items-center gap-2"
            >
              <Trash2 size={18} color="red" />
              <p>حذف</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ orders }) {
  const data = orders;
  const [order, setOrder] = useState(null);
  const [openOrderStatusModal, setOpenOrderStatusModal] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: columns({ setOrder, setOpenOrderStatusModal }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {openOrderStatusModal && (
        <OrderStatus
          open={openOrderStatusModal}
          setOpen={setOpenOrderStatusModal}
          order={order}
        />
      )}
      <div className="w-full h-[100px] flex sm:items-center flex-col-reverse items-end gap-4 sm:flex-row sm:h-[40px] sm:gap-0 my-4 sm:justify-between">
        <Input
          placeholder="ابحث الان"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-[320px] mr-1 bg-primary-foreground focus-visible:ring-secondary"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="focus-visible:ring-secondary focus-visible:ring-offset-0"
            >
              عمود <ChevronDown className="mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <p className="text-sm text-muted-foreground text-center">
              تبديل الاعمدة
            </p>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  <span>{column.columnDef.header}</span>
                  <span>
                    {column.getIsVisible() ? <Check size={16} /> : ""}
                  </span>{" "}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Container className="overflow-x-auto">
        <div className="rounded-md border min-w-[800px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className={`${
                        header.column.columnDef.accessorKey === "status"
                          ? "text-center"
                          : "text-right"
                      } hover:bg-muted`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Container>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex text-sm text-muted-foreground" dir="ltr">
          {table.getFilteredSelectedRowModel().rows.length}
          {` of `}
          {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}
