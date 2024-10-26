"use client";
import { fetchDashboardData } from "@/lib/fakeAdminData";
import { Receipt } from "lucide-react";
import React, { useEffect, useState } from "react";

function Plans() {
  const [plans, setPlans] = useState([]);
  const formatter = new Intl.NumberFormat("en-US");
  function handlePlanClick(plan) {
    alert("plan with id: " + plan.id + " clicked");
  }

  useEffect(() => {
    async function fetchPlans() {
      let res = (await fetchDashboardData()).subscriptions.subscription_plans;
      res = res.filter((plan) => plan.status === "active");
      setPlans(res);
    }
    fetchPlans();
  }, []);
  return (
    <>
      <h1 className="text-2xl text-center font-semibold h-12 col-span-full p-8">
        اختر خطة الاشتراك
      </h1>
      <div className="w-full px-6 min-h-[calc(100vh-120px)] p-4 grid gap-4 items-center justify-center sm:grid-cols-2 md:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="col-span-1 w-full flex items-center justify-center"
          >
            <div
              key={plan.id}
              onClick={() => handlePlanClick(plan)}
              className="border rounded-lg p-4 flex flex-col items-center justify-center gap-4 w-[200px] hover:scale-105 transition-transform duration-300 hover:bg-green_1 hover:text-white hover:cursor-pointer"
            >
              <h1 className="text-2xl text-center font-semibold w-full">
                {plan.name}
              </h1>
              <Receipt strokeWidth={0.2} size={150} />
              <div className="flex items-center justify-between w-full">
                <p className="text-base text-right">
                  {plan.periodicity === "monthly"
                    ? "شهري"
                    : plan.periodicity === "yearly"
                    ? "سنوي"
                    : null}
                </p>
                <p className="text-base font-medium text-right">
                  {formatter.format(plan.amount)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Plans;
