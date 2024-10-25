import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/PlansDataTable";
import AddPlan from "@/components/plansModals/AddPlan";
import { fetchDashboardData } from "@/lib/fakeAdminData";

async function fetchPlans() {
  const res = await fetchDashboardData();
  return res.subscriptions.subscription_plans;
}

export default async function Payments() {
  const plans = await fetchPlans();

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
