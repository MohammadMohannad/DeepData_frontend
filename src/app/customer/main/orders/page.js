// app/(your-path)/Orders.jsx
"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/OrdersDataTable";
import { DataPicker } from "@/components/dataPicker/DataPicker";
import ExportButton from "@/components/ExportButton";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // ref for the Orders table
  const tableRef = useRef(null);

  // our fetch function accepts an optional { from, to } range
  const fetchOrders = async ({ from, to } = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (from) params.start_date = from.toISOString().slice(0, 10);
      if (to)   params.end_date   = to.toISOString().slice(0, 10);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_orders`,
        {
          withCredentials: true,
          params,
        }
      );
      setOrders(response.data);
    } catch (err) {
      setError("Error fetching orders data");
    } finally {
      setLoading(false);
    }
  };

  // initial load (no dates)
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <Container className="pb-4">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">طلبات العملاء</h3>
        <div className="min-h-full w-full sm:w-[50%] flex justify-between">
          {/* Date picker */}
          <DataPicker
            onApply={(range) => {
              fetchOrders(range || {});
            }}
          />
          {/* Export to Excel for the orders table */}

        </div>

      </div>

      <div className="w-full flex flex-col sm:flex-row-reverse items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
      <div className="min-h-full w-full sm:w-[50%] flex justify-end">

          <ExportButton
            table={tableRef.current}
            fileName="orders.xlsx"
            label="تحميل اكسل"
            variant="default"
            className="w-2/6 mr-2 min-h-full"
          />
          </div>
         </div>
      {/* Pass the ref into your Orders DataTable */}
      <DataTable ref={tableRef} orders={orders.orders} />
    </Container>
  );
}
