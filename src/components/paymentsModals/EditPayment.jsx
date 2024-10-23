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
import { fetchDashboardData } from "@/lib/fakeAdminData";

function EditPayment({ payment, open, setOpen, allStoresData }) {
  const [loading, setLoading] = useState(false);
  const [newPayment, setNewPayment] = useState({
    entity_id: payment.entity_id,
    amount: payment.amount,
    date: payment.date,
    status: payment.status,
    store: payment.store,
    ...payment,
  });
  const [searchStore, setSearchStore] = useState({ value: "", stores: [] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Payment updated successfully");
      console.log(newPayment);
      setLoading(false);
    }, 4000);
  };

  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        layer="50"
        className="max-w-3xl min-w-2xl flex items-center justify-center flex-col right"
      >
        <h3 className="text-xl font-semibold w-full text-right">
          تعديل مدفوعات
        </h3>
        <p className="text-sm font-semibold mb-4 text-muted-foreground w-full text-right">
          ادخل المعلومات المطلوبة
        </p>
        <form onSubmit={handleSubmit}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] h-12 mb-4 flex items-center justify-between"
              >
                <p>{newPayment.store || "اختر المتجر"}</p>
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-44 w-[280px] overflow-y-scroll">
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
                value={newPayment.entity_id}
                onValueChange={(value) =>
                  setNewPayment({
                    ...newPayment,
                    entity_id: value.id,
                    store: value.name,
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
                    {newPayment.entity_id === store.id && <Check size={18} />}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-[280px] grid grid-cols-5 gap-2 mb-4">
            <label className="text-right col-span-2 text-sm" htmlFor="amount">
              المبلغ
            </label>
            <label className="text-right col-span-3 text-sm" htmlFor="date">
              التاريخ
            </label>
            <Input
              type="text"
              value={
                newPayment.amount ? formatter.format(newPayment.amount) : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ""); // Remove commas
                if (value === "" || /^[0-9]*$/.test(value)) {
                  // Check if it's empty or a valid number
                  setNewPayment({ ...newPayment, amount: value }); // Update the raw value
                }
              }}
              inputMode="numeric"
              id="amount"
              className={`col-span-2`}
              required
            />

            <Input
              value={newPayment.date}
              onChange={(e) =>
                setNewPayment({ ...newPayment, date: e.target.value })
              }
              className="col-span-3"
              id="date"
              required
              type="date"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                dir="ltr"
                variant="outline"
                className="w-[280px] h-12 mb-4 flex items-center justify-between"
              >
                <ChevronDown className="mr-2 h-4 w-4" />

                <p>
                  {newPayment.status === "paid"
                    ? "تم الدفع"
                    : newPayment.status === "partially paid"
                    ? "تم الدفع جزئيا"
                    : newPayment.status === "unpaid"
                    ? "لم يتم الدفع"
                    : null || "حالة الدفع"}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[280px] right">
              <DropdownMenuRadioGroup
                className="flex flex-col gap-2 text-right py-2 px-1 custom-checkbox-item"
                value={newPayment.status}
                onValueChange={(value) =>
                  setNewPayment({ ...newPayment, status: value })
                }
              >
                <DropdownMenuRadioItem
                  className="w-full pl-2 text-green-500 flex items-end flex-row justify-between gap-2"
                  value={"paid"}
                >
                  <span>تم الدفع</span>
                  {newPayment.status === "paid" && <Check size={18} />}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="w-full pl-2 text-orange-500 flex items-end flex-row justify-between gap-2"
                  value={"partially paid"}
                >
                  <span>تم الدفع جزئيا</span>
                  {newPayment.status === "partially paid" && (
                    <Check size={18} />
                  )}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="w-full pl-2 text-red-500 flex items-end flex-row justify-between gap-2"
                  value={"unpaid"}
                >
                  <span>لم يتم الدفع</span>
                  {newPayment.status === "unpaid" && <Check size={18} />}
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
                setNewPayment({});
                setOpen(false);
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
                !newPayment.amount ||
                !newPayment.date ||
                !newPayment.entity_id ||
                !newPayment.status
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

export default EditPayment;
