import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/SubscriptionsDataTable";
import AddSubscription from "@/components/subscriptionsModals/AddSubscription";
import { fetchDashboardData } from "@/lib/fakeAdminData";

async function fetchSubscriptions() {
  const res = await fetchDashboardData();
  return (await fetchDashboardData()).subscriptions.subscription_records;
}
async function fetchAllStores() {
  return (await fetchDashboardData()).payments.allStores;
}
async function fetchPlans() {
  return (await fetchDashboardData()).subscriptions.subscription_plans;
}

export default async function Subscriptions() {
  const subscriptionsData = await fetchSubscriptions();
  const allStores = await fetchAllStores();
  const plans = await fetchPlans();
  //matching store name with store id, plan name with plan id and get clear subscription data finally!!
  const getStoreName = (entityId) => {
    const store = allStores.find((store) => store.id === entityId);
    return store ? store.name : "Unknown Store";
  };
  const getPlanName = (planId) => {
    const plan = plans.find((plan) => plan.id === planId);
    return plan ? plan.name : "Unknown Store";
  };

  const subscriptions = subscriptionsData.map((subscription) => ({
    ...subscription,
    plan_name: getPlanName(subscription.subscription_plan_id),
    entity_name: getStoreName(subscription.entity_id),
  }));

  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">الاشتراكات</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          <AddSubscription plans={plans} allStoresData={allStores} />
        </div>
      </div>
      <DataTable
        subscriptions={subscriptions}
        allStores={allStores}
        plans={plans}
      />
    </Container>
  );
}
