"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/SubscriptionsDataTable";
import AddSubscription from "@/components/subscriptionsModals/AddSubscription";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Payments() {
  const [plans, setPlans] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [plansResponse, storesResponse, subscriptionsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscription_plans`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/entities`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscriptions`, { withCredentials: true }),
        ]);

        setPlans(plansResponse.data);
        setAllStores(storesResponse.data);
        setSubscriptions(subscriptionsResponse.data);
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
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">الاشتراكات</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddSubscription plans={plans} allStoresData={allStores.entities} />
        </div>
      </div>
      <DataTable
        subscriptions={subscriptions}
        allStores={allStores.entities}
        plans={plans}
      />
    </Container>
  );
}
