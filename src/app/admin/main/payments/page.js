import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/PaymentsDataTable";
import AddPayment from "@/components/paymentsModals/AddPayment";
import { fetchDashboardData } from "@/lib/fakeAdminData";


async function fetchPayments() {
  const res = await fetchDashboardData();
  return res.payments.financial;
}
async function fetchAllStores() {
  return (await fetchDashboardData()).payments.allStores;
}

export default async function Payments() {
  const paymentsData = await fetchPayments();
  const allStores = await fetchAllStores();
  //matching store name with store id ang get clear payment data finally!!
  const getStoreName = (entityId) => {
    const store = allStores.find((store) => store.id === entityId);
    return store ? store.name : "Unknown Store";
  };
  const payments = paymentsData.map((payment) => ({
    ...payment,
    store: getStoreName(payment.entity_id),
  }));

  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">المدفوعات</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddPayment allStores={allStores} />
        </div>
      </div>
      <DataTable payments={payments} allStores={allStores} />
    </Container>
  );
}
