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
  Check,
  ChevronDown,
  ChevronsLeftRight,
  Edit,
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
import { Badge } from "../ui/badge";
import OrderStatus from "../ordersModals/OrderStatus";
import EditOrder from "../ordersModals/EditOrder";

const columns = ({ setOpenOrderStatusModal, setOrder, setOpenEditModal }) => [
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
    header: "اسم الزبون",
    cell: ({ row }) => {
      return <div className="cursor-pointer">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "products",
    header: "المنتجات",
    cell: ({ row }) => (
      <div className="grid grid-cols-2 gap-1">
        {row.getValue("products").map((product) => (
          <p className="text-sm col-span-1" key={product.id}>
            {product.product}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "سعر الطلب",
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US");
      return <div>{formatter.format(row.getValue("price"))}</div>;
    },
  },
  {
    accessorKey: "city",
    header: "المحافظة",
    cell: ({ row }) => <div>{row.getValue("city")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "رقم الهاتف",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <div className="w-full h-full text-center">
        <Badge
          className={`h-8 px-4 rounded-md whitespace-nowrap ${
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
            <DropdownMenuItem
              onClick={() => {
                setOrder(order);
                setOpenEditModal(true);
              }}
              className="cursor-pointer flex items-center gap-2"
            >
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
  const [data, setData] = useState(orders);
  const [order, setOrder] = useState(null);
  const [openOrderStatusModal, setOpenOrderStatusModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(orders); // Initialize filteredData with orders
  const [activeStatusFilters, setActiveStatusFilters] = useState([
    "ملغى",
    "الطلب مكتمل",
  ]);
  // Function to update the filtered data based on active filters
  const updateFilteredData = (newFilters) => {
    if (newFilters.length === 0) {
      setFilteredData(orders); // Show all data if no filters are active
    } else {
      setFilteredData(
        orders.filter((order) => newFilters.includes(order.status))
      );
    }
  };

  // Toggle function for status filters
  const toggleStatusFilter = (status) => {
    setActiveStatusFilters((prevFilters) => {
      const newFilters = prevFilters.includes(status)
        ? prevFilters.filter((filter) => filter !== status) // Remove filter if it's already active
        : [...prevFilters, status]; // Add filter if it's not active

      updateFilteredData(newFilters); // Update the filtered data
      return newFilters;
    });
  };

  const table = useReactTable({
    data: filteredData, // Use filteredData here instead of original orders
    columns: columns({ setOrder, setOpenOrderStatusModal, setOpenEditModal }),
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
      {openEditModal && (
        <EditOrder
          open={openEditModal}
          setOpen={setOpenEditModal}
          order={order}
        />
      )}
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
        <div className="flex items-center flex-row-reverse gap-2">
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    <span>{column.columnDef.header}</span>
                    <span>
                      {column.getIsVisible() ? <Check size={16} /> : ""}
                    </span>
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="focus-visible:ring-secondary focus-visible:ring-offset-0"
              >
                الحالة <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                checked={activeStatusFilters.includes("ملغى")}
                onCheckedChange={() => toggleStatusFilter("ملغى")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-red-500 focus:text-red-500"
              >
                <span>الطلب ملغى</span>
                <span>
                  {activeStatusFilters.includes("ملغى") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeStatusFilters.includes("الطلب مكتمل")}
                onCheckedChange={() => toggleStatusFilter("الطلب مكتمل")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-green-500 focus:text-green-500"
              >
                <span>الطلب مكتمل</span>
                <span>
                  {activeStatusFilters.includes("الطلب مكتمل") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
