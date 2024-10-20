"use client";
import { Edit, MoreHorizontal, Trash2, X } from "lucide-react";
import Modal from "../modal/Modal";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "../container/Container";
import EditProductModal from "../ProductModals/EditProduct";

const columns = ({ setProduct, setOpenEditProduct }) => [
  {
    accessorKey: "products",
    header: "المنتجات",
    cell: ({ row }) => <div>{row.getValue("products")}</div>,
  },
  {
    accessorKey: "amount",
    header: "سعر الطلب",
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "status",
    header: "حالة الطلب",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
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
              onClick={() => {
                setProduct(product);
                setOpenEditProduct(true);
              }}
              className="cursor-pointer flex items-center gap-2"
            >
              <Edit size={18} />
              <p>تعديل</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                alert(`Delete ${product.id}: ${product.name}`)
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

function CustomerOrders({ setOpen, prevOrders, open }) {
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [product, setProduct] = useState();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const data = prevOrders;
  const table = useReactTable({
    data,
    columns: columns({
      setProduct,
      setOpenEditProduct,
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
    <>
      {openEditProduct && (
        <EditProductModal
          open={openEditProduct}
          setOpen={setOpenEditProduct}
          product={product}
        />
      )}
      <Modal
        open={open}
        setOpen={setOpen}
        className="max-w-full overflow-auto flex-col"
        layer="10"
      >
        <div className="text-xl w-full flex justify-between items-center mb-2 font-bold">
          <X
            className="text-muted-foreground cursor-pointer"
            size={20}
            strokeWidth={4}
            onClick={() => setOpen(false)}
          />
          <p>الطلبات</p>
        </div>
        <Container className="overflow-x-auto">
          <div className="overflow-x-auto rounded-md right border min-w-[400px]">
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
      </Modal>
    </>
  );
}

export default CustomerOrders;
