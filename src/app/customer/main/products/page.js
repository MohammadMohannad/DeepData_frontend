import AddProductForm from "@/components/ProductModals/AddProductForm";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/ProductsDataTable";
import { Button } from "@/components/ui/button";
import { fetchDashboardData } from "@/lib/fakeData"; // Placeholder for backend integration
import React from "react";

async function products() {
  const res = await fetchDashboardData();
  return res.products;
}

async function Products() {
  const data = await products();
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
        <DataTable products={data} />
      </Container>
    </>
  );
}

export default Products;
