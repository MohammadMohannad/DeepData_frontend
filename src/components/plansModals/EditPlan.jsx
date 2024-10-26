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
import axios from "axios";

function EditPlan({ isOpen, setIsOpen, data }) {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({
    name: data?.name,
    amount: data?.amount,
    periodicity: data?.periodicity,
    status: data?.status,
    ...data,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscription_plans/${data?.id}`, plan,{withCredentials:true});
      alert("Plan updated successfully");
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Failed to update plan. Please try again.");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  

  const formatter = new Intl.NumberFormat("en-US");
  const periodicityOptions = [
    { name: "شهري", value: "monthly" },
    { name: "سنوي", value: "yearly" },
  ];
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
          تعديل خطة اشتراك
        </h3>
        <p className="text-sm font-semibold mb-4 text-muted-foreground w-full text-right">
          ادخل المعلومات المطلوبة
        </p>
        <form onSubmit={handleSubmit}>
          <div className="w-[350px] grid grid-cols-4 gap-2 mb-4">
            <label className="text-right col-span-2 text-sm" htmlFor="name">
              الاسم
            </label>
            <label className="text-right col-span-2 text-sm" htmlFor="amount">
              المبلغ
            </label>
            <Input
              type="text"
              value={plan.name}
              onChange={(e) => {
                setPlan({ ...plan, name: e.target.value });
              }}
              id="name"
              className={`col-span-2`}
              required
            />

            <Input
              type="text"
              value={plan.amount ? formatter.format(plan.amount) : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ""); // Remove commas
                if (value === "" || /^[0-9]*$/.test(value)) {
                  // Check if it's empty or a valid number
                  setPlan({ ...plan, amount: value }); // Update the raw value
                }
              }}
              inputMode="numeric"
              id="amount"
              className={`col-span-2`}
              required
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[350px] h-12 mb-4 flex items-center justify-between"
              >
                <p>
                  {plan.periodicity === "monthly"
                    ? "شهري"
                    : plan.periodicity === "yearly"
                    ? "سنوي"
                    : null || "اختر الحيز الزمني"}
                </p>
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-44 w-[350px] overflow-y-scroll">
              <DropdownMenuRadioGroup
                className="flex flex-col gap-2 text-right py-2 px-1 custom-checkbox-item"
                value={plan.periodicity}
                onValueChange={(value) =>
                  setPlan({ ...plan, periodicity: value })
                }
              >
                {periodicityOptions.map((option, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    className="w-full pl-2 flex items-end flex-row-reverse justify-between gap-2"
                    value={option.value}
                  >
                    <span>{option.name}</span>
                    {option.value === plan.periodicity && <Check size={18} />}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                dir="ltr"
                variant="outline"
                className="w-[350px] h-12 mb-4 flex items-center justify-between"
              >
                <ChevronDown className="mr-2 h-4 w-4" />

                <p>
                  {plan.status === "active"
                    ? "مفعل"
                    : plan.status === "inactive"
                    ? "غير مفعل"
                    : null || "حالة الاشتراك"}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[350px] right">
              <DropdownMenuRadioGroup
                className="flex flex-col gap-2 text-right py-2 px-1 custom-checkbox-item"
                value={plan.status}
                onValueChange={(value) => setPlan({ ...plan, status: value })}
              >
                <DropdownMenuRadioItem
                  className="w-full pl-2 text-green-500 flex items-end flex-row justify-between gap-2"
                  value={"active"}
                >
                  <span>مفعل</span>
                  {plan.status === "active" && <Check size={18} />}
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  className="w-full pl-2 text-red-500 flex items-end flex-row justify-between gap-2"
                  value={"inactive"}
                >
                  <span>غير مفعل</span>
                  {plan.status === "inactive" && <Check size={18} />}
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
                setPlan({});
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
                !plan.amount ||
                !plan.name ||
                !plan.periodicity ||
                !plan.status
              }
            >
              <p className="right transition-all duration-300 ease-in">اضافة</p>
              <span className="block scale-75">{loading && <Loader />}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditPlan;
