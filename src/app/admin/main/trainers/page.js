"use client";
import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/TrainersDataTable";
import { fetchDashboardData } from "@/lib/fakeAdminData";
import { useEffect, useState } from "react";

export default function Trainers() {
  const [data, setData] = useState([]);
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDashboardData();
      setData(res.trainers);
      setStores(res.allStores);
    };
    fetchData();
  }, []);
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">المدربين</h3>
      </div>
      <DataTable trainers={data} allStores={stores} />
    </Container>
  );
}
