"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/EmployeesDataTable";
import { useState, useEffect } from "react";
import AddEmployee from "@/components/employeesModals/AddEmployee";
import { fetchDashboardData } from "@/lib/fakeCustomerData";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]); // State for customers data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Send GET request to the Rails API
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entity_users`, {
          withCredentials: true, // Ensure cookies are included
        });
        setEmployees(response.data); // Update state with fetched data
      } catch (error) {
        setError("Error fetching employees data");
      } finally {
        setLoading(false); // Mark loading as finished
      }
    };

    fetchEmployees(); // Fetch customers when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }


  if (error) {
    return <div>Error: {error}</div>; // Render an error message if fetching fails
  }
  console.log(employees)

  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">الموظفين</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddEmployee />
        </div>
      </div>
      <DataTable employees={employees.users} />
    </Container>
  );
}
