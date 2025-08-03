// src/app/(your-path)/Customers.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/CustomersDataTable";
import ExportButton from "@/components/ExportButton";
import { customersColumns } from "@/config/customersColumns";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [error,     setError]     = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_customers`, {
        withCredentials: true,
      })
      .then((res) => setCustomers(res.data.customers))
      .catch(() => setError("Error fetching customers"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <Container className="pb-4">
      {/* Top bar: title + export */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">العملاء</h3>
        <div className="min-h-full w-full flex-row-reverse sm:w-[380px] flex justify-start">
          <ExportButton
            data={customers}
            columns={customersColumns}
            fileName="Customers.xlsx"
            label="تحميل اكسل"
            variant="default"
            size="default"
            className="w-2/6 mr-2 min-h-full"
          />
        </div>
      </div>

      {/* Your existing table component */}
      <DataTable customers={customers} />
    </Container>
  );
}
