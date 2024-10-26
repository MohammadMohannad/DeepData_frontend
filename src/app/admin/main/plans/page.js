"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/PlansDataTable";
import AddPlan from "@/components/plansModals/AddPlan";
import { fetchDashboardData } from "@/lib/fakeAdminData";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Send GET request to the Rails API
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscription_plans`, {
          withCredentials: true, // Ensure cookies are included
        });

        console.log(response);
        setPlans(response.data); // Update state with fetched data
      } catch (error) {
        setError("Error fetching plans data");
      } finally {
        setLoading(false); // Mark loading as finished
      }
    };

    fetchPlans(); // Fetch customers when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error message if fetching fails
  }
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">خطط الاشتراك</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddPlan />
        </div>
      </div>
      <DataTable plans={plans} />
    </Container>
  );
}
