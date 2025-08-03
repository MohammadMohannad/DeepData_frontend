// src/app/(your-path)/Orders.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/OrdersDataTable";
import ExportButton from "@/components/ExportButton";
import { ordersColumns } from "@/config/ordersColumns";
import { DataPicker } from "@/components/dataPicker/DataPicker";

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [error,  setError]    = useState(null);
  const [loading,setLoading]  = useState(true);

  const fetchOrders = async ({ from, to } = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (from) params.start_date = from.toISOString().slice(0, 10);
      if (to)   params.end_date   = to.toISOString().slice(0, 10);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_orders`,
        { withCredentials: true, params }
      );
      setOrders(res.data.orders);
    } catch {
      setError("Error fetching orders data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <Container className="pb-4">
      {/* Top bar: title, date picker, export */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">طلبات العملاء</h3>
        <div className="min-h-full w-full sm:w-[50%] flex justify-between">
          <DataPicker onApply={(range) => fetchOrders(range || {})} />
        
        </div>
      </div>
      <div className="flex justify-end mb-4">
          <ExportButton
          data={orders}
          columns={ordersColumns}
          fileName="orders.xlsx"
          label="تحميل اكسل"
          variant="default"
          size="default"
          className="w-2/6 mr-2 min-h-full"
        />
    
      </div>

      {/* Your unchanged OrdersDataTable */}
      <DataTable orders={orders} />
    </Container>
  );
}
