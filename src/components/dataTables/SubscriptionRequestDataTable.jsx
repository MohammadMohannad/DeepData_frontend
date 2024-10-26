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
import { Check, ChevronDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";

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
import EditPayment from "../paymentsModals/EditPayment";
import EditSubscription from "../subscriptionsModals/EditSubscription";

const columns = ({ setSubscriptionRequest }) => [
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
    accessorKey: "entity_name",
    header: "اسم المتجر",
    cell: ({ row }) => {
      return (
        <div className="cursor-pointer">{row.getValue("entity_name")}</div>
      );
    },
  },
  {
    accessorKey: "entity_owner",
    header: "مالك المتجر",
    cell: ({ row }) => {
      return <div>{row.getValue("entity_owner")}</div>;
    },
  },
  {
    accessorKey: "plan_name",
    header: "خطة الاشتراك",
    cell: ({ row }) => {
      return <div>{row.getValue("plan_name")}</div>;
    },
  },
  {
    accessorKey: "plan_periodicity",
    header: "تكرارية الخطة",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("plan_periodicity") === "monthly"
            ? "شهريا"
            : row.getValue("plan_periodicity") === "yearly"
            ? "سنويا"
            : null}
        </div>
      );
    },
  },
  {
    accessorKey: "plan_amount",
    header: "المبلغ",
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US");
      return <div>{formatter.format(row.getValue("plan_amount"))}</div>;
    },
  },
  {
    accessorKey: "subscription_period_amount",
    header: "المدة",
    cell: ({ row }) => {
      return <div>{row.getValue("subscription_period_amount")}</div>;
    },
  },
  {
    accessorKey: "start_date",
    header: "تاريخ الاشتراك",
    cell: ({ row }) => {
      return <div>{row.getValue("start_date")}</div>;
    },
  },
  {
    accessorKey: "end_date",
    header: "تاريخ الانتهاء",
    cell: ({ row }) => {
      return <div>{row.getValue("end_date")}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "الاجراء",
    cell: ({ row }) => {
      const subscriptionRequest = row.original;
      return subscriptionRequest.status === "accepted" ? (
        <div className="w-full h-full text-center">
          <Badge
            className={`h-8 px-4 rounded-md whitespace-nowrap bg-green-400 text-white font-bold hover:bg-green-500`}
          >
            مقبول
          </Badge>
        </div>
      ) : subscriptionRequest.status === "pending" ? (
        <div className="w-full h-full text-center flex justify-center items-center gap-3">
          <Button
            onClick={() => {
              setSubscriptionRequest({
                ...subscriptionRequest,
                status: "accepted",
              });
              alert("تم قبول الطلب بنجاح");
            }}
            className={`h-10 px-4 rounded-md whitespace-nowrap bg-green-400 text-white font-bold hover:bg-green-500`}
          >
            قبول
          </Button>
          <Button
            onClick={() => {
              setSubscriptionRequest({
                ...subscriptionRequest,
                status: "rejected",
              });
              alert("تم رفض الطلب ");
            }}
            className={`h-10 px-4 rounded-md whitespace-nowrap bg-red-400 text-white font-bold hover:bg-red-500`}
          >
            رفض
          </Button>
        </div>
      ) : (
        subscriptionRequest.status === "rejected" && (
          <div className="w-full h-full text-center">
            <Badge
              className={`h-8 px-4 rounded-md whitespace-nowrap bg-red-400 text-white font-bold hover:bg-red-500`}
            >
              مرفوض
            </Badge>
          </div>
        )
      );
    },
  },
  //   {
  //     id: "actions",
  //     header: "الاجراءات",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const subscription = row.original;
  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="start" className="right">
  //             <DropdownMenuLabel>الاجراءات</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => {
  //                 setSubscription(subscription);
  //                 setOpenSubscriptionModal(true);
  //               }}
  //               className="cursor-pointer flex items-center gap-2"
  //             >
  //               <Edit size={18} />
  //               <p>تعديل</p>
  //             </DropdownMenuItem>
  //             {/* <DropdownMenuItem
  //               className="cursor-pointer flex items-center gap-2"
  //               onClick={() => {
  //                 setOrder(payment);
  //                 setOpenOrderStatusModal(true);
  //               }}
  //             >
  //               <ChevronsLeftRight size={18} />
  //               <p>تغير حالة الطلب</p>
  //             </DropdownMenuItem> */}
  //             <DropdownMenuItem
  //               onClick={() =>
  //                 alert(`Delete ${subscription.id}: ${subscription.name}`)
  //               }
  //               className="cursor-pointer flex items-center gap-2"
  //             >
  //               <Trash2 size={18} color="red" />
  //               <p>حذف</p>
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];

export function DataTable({ subscriptions }) {
  const [subscriptionRequest, setSubscriptionRequest] = useState(null);
  //   const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  //   const [openEditModal, setOpenEditModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState(subscriptions);
  const [activeStatusFilters, setActiveStatusFilters] = useState([
    "pending",
    "accepted",
    "rejected",
  ]);
  // Function to update the filtered data based on active filters
  const updateFilteredData = (newFilters) => {
    if (newFilters.length === 0) {
      setFilteredData(subscriptions); // Show all data if no filters are active
    } else {
      setFilteredData(
        subscriptions.filter((e) => newFilters.includes(e.status))
      );
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value);
    setFilteredData(
      subscriptions.filter(
        (item) =>
          item.entity_name.toLowerCase().includes(value) ||
          item.entity_owner.toLowerCase().includes(value)
      )
    );
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
    columns: columns({ setSubscriptionRequest }),
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
      {/* {openSubscriptionModal && (
        <EditSubscription
          isOpen={openSubscriptionModal}
          setIsOpen={setOpenSubscriptionModal}
          data={subscription}
          allStoresData={allStores}
          plans={plans}
        />
      )} */}
      {/* {openOrderStatusModal && (
        <OrderStatus
          open={openOrderStatusModal}
          setOpen={setOpenOrderStatusModal}
          order={order}
        />
      )} */}
      <div className="w-full h-[100px] flex sm:items-center flex-col-reverse items-end gap-4 sm:flex-row sm:h-[40px] sm:gap-0 my-4 sm:justify-between">
        <Input
          placeholder="ابحث الان"
          value={searchInput}
          onChange={handleSearchInputChange}
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
                checked={activeStatusFilters.includes("rejected")}
                onCheckedChange={() => toggleStatusFilter("rejected")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-red-500 focus:text-red-500"
              >
                <span>مرفوض</span>
                <span>
                  {activeStatusFilters.includes("rejected") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeStatusFilters.includes("accepted")}
                onCheckedChange={() => toggleStatusFilter("accepted")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-green-500 focus:text-green-500"
              >
                <span>مقبول</span>
                <span>
                  {activeStatusFilters.includes("accepted") ? (
                    <Check size={16} />
                  ) : (
                    ""
                  )}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeStatusFilters.includes("pending")}
                onCheckedChange={() => toggleStatusFilter("pending")}
                className="flex items-center justify-end gap-2 text-right py-2 px-5 custom-checkbox-item text-orange-500 focus:text-orange-500"
              >
                <span>معلق</span>
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