"use client";
import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ReviewStores({ open, setOpen, trainer }) {
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState(trainer.stores);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stores); //add the fetch here
    setLoading(true);
    setTimeout(() => {
      alert("trainer stores-to-review updated successfully");
      setLoading(false);
      setOpen(false);
    }, 4000);
  };

  useEffect(() => {
    // Add or remove the overflow-hidden class based on the open state
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function to ensure the class is removed when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);
  return (
    <Modal
      open={open}
      layer="50"
      className="max-w-3xl min-w-2xl flex items-center justify-center flex-col right"
    >
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">تعديل معلومات المدرب</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full my-8">
          <Select dir="rtl" onValueChange={(value) => setStores(value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="حدد المتاجر لمراجعتها" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>المتاجر المتاحة</SelectLabel>
                {stores.map((store, index) => (
                  <SelectItem
                    key={index}
                    value={store.store_id}
                    className="cursor-pointer"
                  >
                    {store.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-9 flex-row-reverse flex justify-between items-center">
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            className="h-full w-20"
            onClick={() => {
              setOpen(false); // Close the modal
              setStores([]);
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            disabled={stores == trainer.stores || loading}
            type="submit"
            className={`h-full w-20 transition-all duration-300 ease-in ${
              loading &&
              "opacity-50 w-32 flex flex-row-reverse gap-2 cursor-not-allowed"
            }`}
          >
            <p className="right transition-all duration-300 ease-in">تحديث</p>
            <span className="block scale-75">{loading && <Loader />}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ReviewStores;
