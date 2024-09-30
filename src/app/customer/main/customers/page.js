"use client";
import { useState, useEffect } from "react";
import Container from "@/components/container/Container";
import { DataPicker } from "@/components/dataPicker/DataPicker";
import { DataTable } from "@/components/dataTables/CustomersDataTable";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]); // State for customers data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Send GET request to the Rails API
        const response = await axios.get("http://localhost:3002/api/v1/entity_customers", {
          withCredentials: true, // Ensure cookies are included
        });
        setCustomers(response.data); // Update state with fetched data
      } catch (error) {
        setError("Error fetching customers data");
      } finally {
        setLoading(false); // Mark loading as finished
      }
    };

    fetchCustomers(); // Fetch customers when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error message if fetching fails
  }
  console.log(customers)
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">العملاء</h3>
        <div className="min-h-full w-full sm:w-[380px] flex">
          <DataPicker />
        </div>
      </div>
      <DataTable customers={customers.customers} /> {/* Pass the fetched customers data to DataTable */}
    </Container>
  );
}

export default Customers;
