import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/TrainersDataTable";
import { fetchDashboardData } from "@/lib/fakeAdminData";

async function trainers() {
  const res = await fetchDashboardData();
  return res.trainers;
}

export default async function Trainers() {
  const data = await trainers();
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">المدربين</h3>
      </div>
      <DataTable trainers={data} />
    </Container>
  );
}