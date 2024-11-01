"use client";
import AddProductForm from "@/components/ProductModals/AddProduct";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/ProductsDataTable";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRole } from "@/contexts/RoleContext";

function Products() {
  const role = useRole();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Send GET request to the Rails API
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_products`, {
          withCredentials: true, // Ensure cookies are included
        });
        setProducts(response.data); // Update state with fetched data
      } catch (error) {
        setError("Error fetching products data");
      } finally {
        setLoading(false); // Mark loading as finished
      }
    };

    fetchProducts(); // Fetch customers when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error message if fetching fails
  }
  console.log(products)
  return (
    <>
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
        <DataTable products={products.products} />
      </Container>
    </>
  );
}

export default Products;
