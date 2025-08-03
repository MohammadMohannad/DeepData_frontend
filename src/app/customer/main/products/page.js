"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AddProductForm from "@/components/ProductModals/AddProduct";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/ProductsDataTable";
import ExportButton from "@/components/ExportButton";
import { productsColumns } from "@/config/productsColumns";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";

export default function Products() {
  const role = useRole();
  const [products, setProducts] = useState([]);
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_products`, {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data.products))
      .catch(() => setError("Error fetching products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <Container className="pb-4">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">المنتجات</h3>
        <div className="min-h-full w-full sm:w-[23%] flex justify-between">
          {role === "owner" && (
            <>
              <AddProductForm />
              <Button variant="default" className="w-[45%] mr-2 min-h-full">
                تحميل
              </Button>
            </>
          )}
        </div>
      </div>

      {role === "owner" && (
        <div className="flex justify-end mb-4">
          <ExportButton
            data={products}
            columns={productsColumns}
            fileName="products.xlsx"
            label="تحميل اكسل"
            variant="default"
            size="default"
          />
        </div>
      )}

      <DataTable products={products} />
    </Container>
  );
}
