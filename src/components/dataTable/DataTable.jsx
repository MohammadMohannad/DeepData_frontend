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
  Edit,
  MoreHorizontal,
  Trash,
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

const data = [
  {
    id: 1,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "1234",
    productPrice: 1000,
  },
  {
    id: 2,
    productName: "غسول وجة",
    productRepetition: "شهري",
    productType: "عناية",
    time: "5678",
    productPrice: 1100,
  },
  {
    id: 3,
    productName: "عطر",
    productRepetition: "شهري",
    productType: "عناية",
    time: "9101",
    productPrice: 1200,
  },
  {
    id: 4,
    productName: "معطر",
    productRepetition: "شهري",
    productType: "عناية",
    time: "1213",
    productPrice: 1300,
  },
  {
    id: 5,
    productName: "مرطب",
    productRepetition: "شهري",
    productType: "عناية",
    time: "1415",
    productPrice: 1400,
  },
  {
    id: 6,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "1617",
    productPrice: 1500,
  },
  {
    id: 7,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "1819",
    productPrice: 1600,
  },
  {
    id: 8,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "2020",
    productPrice: 1700,
  },
  {
    id: 9,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "2222",
    productPrice: 1800,
  },
  {
    id: 10,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "2424",
    productPrice: 1900,
  },
  {
    id: 11,
    productName: "صابون",
    productRepetition: "شهري",
    productType: "عناية",
    time: "2626",
    productPrice: 2000,
  },
];

// Define the columns
const columns = [
  {
    accessorKey: "productName",
    header: "اسم المنتج",
    cell: ({ row }) => <div>{row.getValue("productName")}</div>,
  },
  {
    accessorKey: "productRepetition",
    header: "تكرارية المنتج",
    cell: ({ row }) => <div>{row.getValue("productRepetition")}</div>,
  },
  {
    accessorKey: "productType",
    header: "نوع المنتج",
    cell: ({ row }) => <div>{row.getValue("productType")}</div>,
  },
  {
    accessorKey: "time",
    header: "المدة",
    cell: ({ row }) => <div>{row.getValue("time")}</div>,
  },
  {
    accessorKey: "productPrice",
    header: "سعر المنتج",
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US");

      return <div>{formatter.format(row.getValue("productPrice"))}</div>;
    },
  },
  {
    id: "actions",
    header: "الاجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
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
              onClick={() =>
                alert(`Delete ${product.id}: ${product.productName}`)
              }
              className="cursor-pointer flex items-center gap-2"
            >
              <Edit size={18} />
              <p>تعديل</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                alert(`Delete ${product.id}: ${product.productName}`)
              }
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

export function DataTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
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
      <div className="w-full h-[100px] flex sm:items-center flex-col-reverse items-end gap-4 sm:flex-row sm:h-[40px] sm:gap-0 my-4 sm:justify-between">
        <Input
          placeholder="ابحث الان"
          value={table.getColumn("productName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
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
          {/* Adjust min-width as necessary */}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead className="text-right" key={header.id}>
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
