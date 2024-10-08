import Container from "@/components/container/Container";
import { DataPicker } from "@/components/dataPicker/DataPicker";
import { DataTable } from "@/components/dataTables/StoresDataTable";
import { fetchDashboardData } from "@/lib/fakeAdminData";

async function stores() {
  const res = await fetchDashboardData();
  return res.stores;
}

export default async function Orders() {
  const data = await stores();
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">المتاجر</h3>
        <div className="min-h-full min-w-full sm:min-w-[260px] flex">
          <DataPicker withButton={false} className="w-full h-12" />
        </div>
      </div>
      <DataTable stores={data} />
    </Container>
  );
}
