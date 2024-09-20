import Container from "@/components/container/Container";
import { DataPicker } from "@/components/dataPicker/DataPicker";
import { DataTable } from "@/components/dataTables/OrdersDataTable";
import { fetchDashboardData } from "@/lib/fakeData";

async function orders() {
  const res = await fetchDashboardData();
  return res.storeCustomersOrders;
}

export default async function Orders() {
  const data = await orders();
  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">طلبات العملاء</h3>
        <div className="min-h-full min-w-full sm:min-w-[260px] flex">
          <DataPicker withButton={false} className="w-full h-12" />
        </div>
      </div>
      <DataTable orders={data} />
    </Container>
  );
}
