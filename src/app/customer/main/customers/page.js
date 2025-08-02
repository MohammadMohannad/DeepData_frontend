// app/(your-path)/Customers.jsx
"use client";
import { useRef, useState, useEffect } from "react";
import Container from "@/components/container/Container";
import { DataPicker } from "@/components/dataPicker/DataPicker";
import { DataTable } from "@/components/dataTables/CustomersDataTable";
import axios from "axios";
import ExportButton from "@/components/ExportButton";

export default function Customers() {
  const [customers, setCustomers] = useState([]); // State for customers data
  const [error, setError] = useState(null);       // State for error handling
  const [loading, setLoading] = useState(true);   // State for loading status

  // ref for the customers table instance
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_customers`,
          { withCredentials: true }
        );
        setCustomers(response.data);
      } catch (error) {
        setError("Error fetching customers data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="pb-4">
      {/* Top bar: title, date picker, export button */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">العملاء</h3>
        <div className="min-h-full w-full flex-row-reverse sm:w-[380px] flex justify-start">
          <ExportButton
            table={tableRef.current}
            fileName="Customers.xlsx"
            label="تحميل اكسل"
            variant="default"
            className="w-2/6 mr-2 min-h-full"
          />
        </div>
      </div>


      {/* The table itself, forwarded ref */}
      <DataTable ref={tableRef} customers={customers.customers} />
    </Container>
  );
}
