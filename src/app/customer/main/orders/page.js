"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/OrdersDataTable";import { DataPicker } from "@/components/dataPicker/DataPicker";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchDashboardData } from "@/lib/fakeCustomerData";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Send GET request to the Rails API
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_orders`, {
          withCredentials: true, // Ensure cookies are included
        });
        setOrders(response.data); // Update state with fetched data
      } catch (error) {
        setError("Error fetching products data");
      } finally {
        setLoading(false); // Mark loading as finished
      }
    };

    fetchOrders(); // Fetch customers when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error message if fetching fails
  }
  console.log(orders)
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">طلبات العملاء</h3>
        <div className="min-h-full min-w-full sm:min-w-[260px] flex">
          <DataPicker withButton={false} className="w-full h-12" />
        </div>
      </div>
      <DataTable orders={orders.orders} />
    </Container>
  );
}
