import Container from "@/components/container/Container";
import { DataTable } from "@/components/dataTables/SubscriptionRequestDataTable";
import { fetchDashboardData } from "@/lib/fakeAdminData";

async function fetchSubscriptionRequests() {
  return (await fetchDashboardData()).subscriptions.subscription_requests;
}
async function fetchSubscriptionRecords() {
  return (await fetchDashboardData()).subscriptions.subscription_records;
}
async function fetchAllStores() {
  return (await fetchDashboardData()).payments.allStores;
}
async function fetchPlans() {
  return (await fetchDashboardData()).subscriptions.subscription_plans;
}

export default async function SubscriptionsRequests() {
  const subscriptionRequestsData = await fetchSubscriptionRequests();
  const subscriptionRecordsData = await fetchSubscriptionRecords();
  const allStores = await fetchAllStores();
  const plans = await fetchPlans();

  const getStore = (entityId) => {
    const store = allStores.find((store) => store.id === entityId);
    return store ? store : "Unknown Store";
  };

  const getPlan = (planId) => {
    const plan = plans.find((plan) => plan.id === planId);
    return plan
      ? { name: plan.name, amount: plan.amount, periodicity: plan.periodicity }
      : "Unknown Store";
  };
  const getSubscriptionRecord = (subscriptionId) => {
    const subscriptionRecord = subscriptionRecordsData.find(
      (subscriptionRecord) => subscriptionRecord.id === subscriptionId
    );
    return subscriptionRecord
      ? subscriptionRecord
      : "Unknown Subscription Record";
  };

  const subscriptions = subscriptionRequestsData.map((subscription) => ({
    id: subscription.id,
    plan_id: subscription.subscription_plan_id,
    entity_id: subscription.entity_id,
    subscription_record_id: subscription.subscription_record_id,
    plan_name: getPlan(subscription.subscription_plan_id).name,
    plan_amount: getPlan(subscription.subscription_plan_id).amount,
    plan_periodicity: getPlan(subscription.subscription_plan_id).periodicity,
    entity_name: getStore(subscription.entity_id).name,
    entity_owner: getStore(subscription.entity_id).owner,
    subscription_period_amount: getSubscriptionRecord(
      subscription.subscription_record_id
    ).period_amount,
    start_date: getSubscriptionRecord(subscription.subscription_record_id)
      .start_date,
    end_date: getSubscriptionRecord(subscription.subscription_record_id)
      .end_date,
    status: subscription.status,
  }));

  return (
    <Container>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-[10px] sm:mb-[14px]">
        <h3 className="text-3xl font-bold mb-4 sm:mb-0">طلبات الاشتراك</h3>
        <div className="min-h-full min-w-full sm:min-w-[120px] flex">
          {/* 
           <AddSubscription plans={plans} allStoresData={allStores} />
          */}
        </div>
      </div>
      <DataTable subscriptions={subscriptions} />
    </Container>
  );
}
