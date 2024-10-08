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
  ArchiveRestore,
  Check,
  ChevronDown,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
import AddTrainer from "../adminTrainersModal/AddTrainer";
import EditTrainer from "../adminTrainersModal/EditTrainer";
import ReviewStores from "../adminTrainersModal/ReviewStores";

const columns = ({ setTrainer, setOpenEditTrainer, setOpenReviewStores }) => [
  {
    accessorKey: "name",
    header: "الاسم كامل",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "رقم الهاتف",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "date",
    header: "التاريخ",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "stores",
    header: "عدد المتاجر",
    cell: ({ row }) => {
      const stores = row.getValue("stores");
      const storesCount = Array.isArray(stores) ? stores.length : 0;
      return <div>{storesCount}</div>;
    },
  },
  {
    id: "actions",
    header: "الاجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const trainer = row.original;
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
                setTrainer(trainer);
                setOpenEditTrainer(true);
              }}
              className="cursor-pointer flex items-center gap-2"
            >
              <Edit size={18} />
              <p>تعديل</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTrainer(trainer);
                setOpenReviewStores(true);
              }}
              className="cursor-pointer flex items-center gap-2"
            >
              <ArchiveRestore size={18} />
              <p>اضافة متجر</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Delete ${trainer.id}: ${trainer.name}`)}
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

export function DataTable({ trainers }) {
  const [open, setOpen] = useState(false);
  const [openEditTrainer, setOpenEditTrainer] = useState(false);
  const [openReviewStores, setOpenReviewStores] = useState(false);
  const [trainer, setTrainer] = useState();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const data = trainers;
  const table = useReactTable({
    data,
    columns: columns({
      setTrainer,
      setOpen,
      setOpenEditTrainer,
      setOpenReviewStores,
    }),
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
      {openReviewStores && (
        <ReviewStores
          open={openReviewStores}
          setOpen={setOpenReviewStores}
          trainer={trainer}
        />
      )}
      {openEditTrainer && (
        <EditTrainer
          open={openEditTrainer}
          setOpen={setOpenEditTrainer}
          trainer={trainer}
        />
      )}
      {open && <AddTrainer open={open} setOpen={setOpen} />}
      <div className="w-full h-[100px] flex sm:items-center flex-col-reverse items-end gap-4 sm:flex-row sm:h-[40px] sm:gap-0 my-4 sm:justify-between">
        <Input
          placeholder="ابحث الان"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-[320px] mr-1 bg-primary-foreground focus-visible:ring-secondary"
        />
        <div className="flex items-center gap-2">
          <Button
            onClick={setOpen}
            className="flex items-center bg-green_1 text-white"
          >
            <Plus color="white" />
            <p>اضافة مدرب</p>
          </Button>
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
        </div>
      </div>
      <Container className="overflow-x-auto">
        <div className="rounded-md border min-w-[800px]">
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
