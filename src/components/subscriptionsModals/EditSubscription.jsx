"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronDown, Plus } from "lucide-react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Loader from "../loader/Loader";

function EditSubscription({ data, plans, allStoresData, isOpen, setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({
    ...data,
  });
  const [searchStore, setSearchStore] = useState({ value: "", stores: [] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Payment updated successfully");
      console.log(subscription);
      setLoading(false);
    }, 4000);
  };

  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        layer="50"
        className="max-w-3xl min-w-2xl flex items-center justify-center flex-col right"
      >
        <h3 className="text-xl font-semibold w-full text-right">
          تعديل اشتراك
        </h3>
        <p className="text-sm font-semibold mb-4 text-muted-foreground w-full text-right">
          ادخل المعلومات المطلوبة
        </p>
        <form onSubmit={handleSubmit}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[350px] h-12 mb-4 flex items-center justify-between"
              >
                <p>{subscription.entity_name || "اختر المتجر"}</p>
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-44 w-[350px] overflow-y-scroll">
              <Input
                autoFocus
                dir="rtl"
                value={searchStore.value}
                type="text"
                placeholder="ابحث عن المتجر"
                onChange={(e) =>
                  setSearchStore({
                    value: e.target.value,
                    stores: allStoresData.filter((store) =>
                      store.name.includes(e.target.value)
                    ),
                  })
                }
                className="w-full"
              />
              <p className="text-sm font-semibold text-muted-foreground text-right pr-2 min-h-8 pt-1.5">
                المتاجر
              </p>
              <DropdownMenuRadioGroup
                className="flex flex-col gap-2 text-right py-2 px-1 custom-checkbox-item"
                value={subscription.entity_id}
                onValueChange={(value) =>
                  setSubscription({
                    ...subscription,
                    entity_id: value.id,
                    entity_name: value.name,
                  })
                }
              >
                {(searchStore.stores.length > 0
                  ? searchStore.stores
                  : allStoresData
                ).map((store, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    className="w-full pl-2 flex items-end flex-row-reverse justify-between gap-2"
                    value={store}
                  >
                    <span>{store.name}</span>
                    {subscription.entity_id === store.id && <Check size={18} />}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[350px] h-12 mb-4 flex items-center justify-between"
              >
                <p>{subscription.plan_name || "اختر نوع الاشتراك"}</p>
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-44 w-[350px] overflow-y-scroll">
              <p className="text-sm font-semibold text-muted-foreground text-right pr-2 min-h-8 pt-1.5">
                انواع الاشتراكات
              </p>
              <DropdownMenuRadioGroup
                className="flex flex-col gap-2 text-right py-2 px-1 custom-checkbox-item"
                value={subscription.subscription_plan_id}
                onValueChange={(value) => {
                  setSubscription({
                    ...subscription,
                    subscription_plan_id: value.id,
                    plan_name: value.name,
                  });
                }}
              >
                {plans.map((plan, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    className="w-full pl-2 flex items-end flex-row-reverse justify-between gap-2"
                    value={plan}
                  >
                    <span>{plan.name}</span>
                    {subscription.subscription_plan_id === plan.id && (
                      <Check size={18} />
                    )}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-[350px] grid grid-cols-4 gap-2 mb-4">
            <label className="text-right col-span-3 text-sm" htmlFor="amount">
              المبلغ
            </label>
            <label className="text-right col-span-1 text-sm" htmlFor="period">
              المدة
            </label>
            <Input
              disabled={subscription.subscription_plan_id ? false : true}
              type="text"
              value={
                subscription.amount ? formatter.format(subscription.amount) : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ""); // Remove commas
                if (value === "" || /^[0-9]*$/.test(value)) {
                  // Check if it's empty or a valid number
                  setSubscription({ ...subscription, amount: value }); // Update the raw value
                }
              }}
              inputMode="numeric"
              id="amount"
              className={`col-span-3 mb-4`}
              required
            />
            <Input
              disabled={subscription.subscription_plan_id ? false : true}
              type="text"
              value={
                subscription.period_amount ? subscription.period_amount : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ""); // Remove commas
                if (value === "" || /^[0-9]*$/.test(value)) {
                  // Check if it's empty or a valid number
                  setSubscription({
                    ...subscription,
                    period_amount: value,
                  });
                }
              }}
              inputMode="numeric"
              id="period"
              className={`col-span-1 mb-4`}
              required
            />
          </div>

          <div className="w-[350px] grid grid-cols-2 gap-2 mb-4">
            <label
              className="text-right col-span-1 text-sm"
              htmlFor="startDate"
            >
              تاريخ البدء
            </label>
            <label className="text-right col-span-1 text-sm" htmlFor="endDate">
              تاريخ الانتهاء
            </label>
            <Input
              value={subscription.start_date || ""}
              onChange={(e) =>
                setSubscription({ ...subscription, start_date: e.target.value })
              }
              className="col-span-1"
              id="startDate"
              required
              type="date"
            />

            <Input
              value={subscription.end_date || ""}
              onChange={(e) =>
                setSubscription({ ...subscription, end_date: e.target.value })
              }
              className="col-span-1"
              id="endDate"
              required
              type="date"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                dir="ltr"
                variant="outline"
                className="w-[350px] h-12 mb-4 flex items-center justify-between"
              >
                <ChevronDown className="mr-2 h-4 w-4" />

                <p>
                  {subscription.status === "active"
                    ? "مفعل"
                    : subscription.status === "inactive"
                    ? "غير مفعل"
                    : null || "حالة الاشتراك"}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[350px] right">
              <DropdownMenuRadioGroup
                className="flex flex-col gap-2 text-right py-2 px-1 custom-checkbox-item"
                value={subscription.status}
                onValueChange={(value) =>
                  setSubscription({ ...subscription, status: value })
                }
              >
                <DropdownMenuRadioItem
                  className="w-full pl-2 text-green-500 flex items-end flex-row justify-between gap-2"
                  value={"active"}
                >
                  <span>مفعل</span>
                  {subscription.status === "active" && <Check size={18} />}
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  className="w-full pl-2 text-red-500 flex items-end flex-row justify-between gap-2"
                  value={"inactive"}
                >
                  <span>غير مفعل</span>
                  {subscription.status === "inactive" && <Check size={18} />}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-full h-12 flex gap-2 flex-row-reverse items-center justify-between">
            <Button
              disabled={loading}
              variant="ghost"
              type="button"
              className="h-full w-20"
              onClick={() => {
                setSubscription({});
                setIsOpen(false);
              }}
            >
              الغاء
            </Button>
            <Button
              variant="default"
              type="submit"
              className={`h-full w-20 transition-all duration-300 ease-in ${
                loading &&
                "opacity-50 w-32 flex flex-row-reverse gap-2 cursor-not-allowed"
              }`}
              disabled={
                loading ||
                !subscription.subscription_plan_id ||
                !subscription.amount ||
                !subscription.period_amount ||
                !subscription.entity_id ||
                !subscription.start_date ||
                !subscription.end_date ||
                !subscription.status
              }
            >
              <p className="right transition-all duration-300 ease-in">حفظ</p>
              <span className="block scale-75">{loading && <Loader />}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditSubscription;
