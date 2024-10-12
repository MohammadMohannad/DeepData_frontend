"use client";
import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function ReviewStores({ open, setOpen, trainer, allStoresData }) {
  const [loading, setLoading] = useState(false);
  const [trainerStoresToReview, setTrainerStoresToReview] = useState(
    trainer.stores.map((store) => store.id)
  );
  const [allStores, setAllStores] = useState(allStoresData);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] focus-visible:ring-secondary focus-visible:ring-offset-0 flex items-center justify-between"
              >
                <p> حدد المتاجر لمراجعتها</p>
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[280px] max-h-[300px] overflow-y-auto scrollbar-hide"
              align="start"
            >
              <p className="text-sm font-semibold text-muted-foreground text-right pr-2 min-h-8 pt-1.5">
                المتاجر المتاحة
              </p>
              {allStores.map((store, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  className="flex items-center justify-end gap-2 text-right py-2 px-1 custom-checkbox-item"
                  checked={trainerStoresToReview.includes(store.id)}
                  onCheckedChange={(value) => {
                    if (value) {
                      setTrainerStoresToReview((prev) =>
                        prev.includes(store.id)
                          ? prev.filter((id) => id !== store.id)
                          : [...prev, store.id]
                      );
                    } else {
                      setTrainerStoresToReview((prev) =>
                        prev.filter((id) => id !== store.id)
                      );
                    }
                  }}
                >
                  <span>{store.name}</span>
                  {/* This span holds space for the checkmark */}
                  <span className="w-5 text-center">
                    {trainerStoresToReview.includes(store.id) && (
                      <Check size={16} />
                    )}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full h-9 flex-row-reverse flex justify-between items-center">
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            className="h-full w-20"
            onClick={() => {
              setOpen(false);
              setTrainerStoresToReview([]);
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            disabled={trainerStoresToReview == trainer.stores || loading}
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
