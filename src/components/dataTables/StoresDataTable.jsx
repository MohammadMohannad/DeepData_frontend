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
  BadgeCheck,
  Check,
  ChevronDown,
  CopyPlus,
  Edit,
  MoreHorizontal,
  Plus,
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
import StatusModal from "../adminStoresModal/StatusModal";
import AddStore from "../adminStoresModal/AddStore";
import EditStore from "../adminStoresModal/EditStore";
import NewTemplate from "../adminStoresModal/NewTemplate";

const columns = ({
  setOpenStoreStatusModal,
  setStore,
  setOpenEditModal,
  setOpenTemplate,
}) => [
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
    header: "اسم المتجر",
    cell: ({ row }) => {
      return <div className="cursor-pointer">{row.getValue("name")}</div>;
    },
  },
 ,
  {
    accessorKey: "joinDate",
    header: "تاريخ الانضمام",
    cell: ({ row }) => {
      return <div>{row.getValue("joinDate")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "تاريخ الانتهاء",
    cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
  },
  {
    accessorKey: "country",
    header: "البلد",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "state",
    header: "المحافظة",
    cell: ({ row }) => <div>{row.getValue("state")}</div>,
  },
  {
    accessorKey: "city",
    header: "المدينة",
    cell: ({ row }) => <div>{row.getValue("city")}</div>,
  },
  {
    accessorKey: "instagram_user",
    header: "معرف الانستغرام",
    cell: ({ row }) => <div>{row.getValue("instagram_user")}</div>,
  },
  {
    accessorKey: "entity_phone",
    header: ({ column }) => (
      <Button
        className="hover:bg-transparent"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ArrowUpDown className="ml-2 h-4 w-4" />
        رقم الهاتف
      </Button>
    ),
    cell: ({ row }) => (
      <div className="pr-3.5">{row.getValue("entity_phone")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <div className="w-full h-full text-center">
        <Badge
          className={`h-8 px-4 rounded-md whitespace-nowrap ${
            row.getValue("status") === "inactive"
              ? "bg-[#FFE5E7] text-red-500 hover:bg-red-300"
              : row.getValue("status") === "active"
              ? "bg-[#C8FFE1] text-[#00B112] hover:bg-green-300"
              : "bg-[#FFF6DB] text-[#D75300] hover:bg-[#FFF1C9]"
          }`}
        >
          {row.getValue("status") === "active"
            ? "فعال"
            : row.getValue("status") === "inactive"
            ? "غير فعال"
            : "قيد الانتظار"}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "الاجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const store = row.original;
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
                setStore(store);
                setOpenEditModal(true);
              }}
              className="cursor-pointer flex items-center gap-2"
            >
              <Edit size={18} />
              <p>تعديل</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setStore(store);
                setOpenTemplate(true);
              }}
              className="cursor-pointer flex items-center gap-2"
            >
              <CopyPlus size={18} />
              <p>اضافة قالب</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                setStore(store);
                setOpenStoreStatusModal(true);
              }}
            >
              <BadgeCheck size={18} />
              <p>الحالة</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Delete ${store.id}: ${store.name}`)}
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

export function DataTable({ stores }) {
  const [openAddStore, setOpenAddStore] = useState(false);
  const [store, setStore] = useState(null);
  const [openStoreStatusModal, setOpenStoreStatusModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [openTemplate, setOpenTemplate] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    country: false,
    city: false,
    joinDate: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(stores);
  const [activeStatusFilters, setActiveStatusFilters] = useState([
    "غير فعال",
    "فعال",
    "قيد الانتظار",
  ]);
  // Function to update the filtered data based on active filters
  const updateFilteredData = (newFilters) => {
    if (newFilters.length === 0) {
      setFilteredData(stores); // Show all data if no filters are active
    } else {
      setFilteredData(
        stores.filter((store) => newFilters.includes(store.status))
      );
    }
  };

  // Toggle function for status filters
  const toggleStatusFilter = (status) => {
    setActiveStatusFilters((prevFilters) => {
      const newFilters = prevFilters.includes(status)
        ? prevFilters.filter((filter) => filter !== status) // Remove filter if it's already active
        : [...prevFilters, status];

      updateFilteredData(newFilters);
      return newFilters;
    });
  };

  const table = useReactTable({
    data: filteredData,
    columns: columns({
      setStore,
      setOpenStoreStatusModal,
      setOpenEditModal,
      setOpenTemplate,
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
      {openTemplate && (
        <NewTemplate
          open={openTemplate}
          setOpen={setOpenTemplate}
          store={store}
        />
      )}
      {openEditModal && (
        <EditStore
          open={openEditModal}
          setOpen={setOpenEditModal}
          store={store}
        />
      )}
      {openAddStore && (
        <AddStore open={openAddStore} setOpen={setOpenAddStore} />
      )}
      {openStoreStatusModal && (
        <StatusModal
          open={openStoreStatusModal}
          setOpen={setOpenStoreStatusModal}
          store={store}
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
                    <span>
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : "رقم الهاتف"}
                    </span>
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
                checked={activeStatusFilters.includes("inactive")}
                onCheckedChange={() => toggleStatusFilter("inactive")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-red-500 focus:text-red-500"
              >
                <span>غير فعال</span>
                <span>
                  {activeStatusFilters.includes("inactive") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeStatusFilters.includes("active")}
                onCheckedChange={() => toggleStatusFilter("active")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-green-500 focus:text-green-500"
              >
                <span>فعال</span>
                <span>
                  {activeStatusFilters.includes("active") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeStatusFilters.includes("pending")}
                onCheckedChange={() => toggleStatusFilter("pending")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-[#ffe08c] focus:text-[#ffe08c]"
              >
                <span>قيد الانتظار</span>
                <span>
                  {activeStatusFilters.includes("pending") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="text-white bg-green_1" onClick={setOpenAddStore}>
            <Plus />
            <p>اضافة متجر</p>
          </Button>
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
