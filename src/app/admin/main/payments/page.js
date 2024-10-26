"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/PaymentsDataTable";
import AddPayment from "@/components/paymentsModals/AddPayment";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Payments() {
  const [allStores, setAllStores] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesResponse, paymentsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entities`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments`, { withCredentials: true }),
        ]);

        setAllStores(storesResponse.data);
        setPayments(paymentsResponse.data);
        console.log("Payments data:", paymentsResponse.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">المدفوعات</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddPayment allStores={allStores?.entities || []} />
        </div>
      </div>
      <DataTable payments={payments} allStores={allStores?.entities || []} />
    </Container>
  );
}
