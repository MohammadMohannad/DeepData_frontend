import AddProductForm from "@/components/addProductForm/AddProductForm";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTable/DataTable";
import { Button } from "@/components/ui/button";
import React from "react";

function Products() {
  return (
    <>
      <Container className="pb-4">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
          <h3 className="text-3xl font-bold mb-4 sm:mb-0">المنتجات</h3>
          <div className="min-h-full w-full sm:w-[23%] flex justify-between">
            <AddProductForm />
            <Button variant="default" className="w-[45%] mr-2 min-h-full">
              تحميل
            </Button>
          </div>
        </div>
        <DataTable />
      </Container>
    </>
  );
}

export default Products;
