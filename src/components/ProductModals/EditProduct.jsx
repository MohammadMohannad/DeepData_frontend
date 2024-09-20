"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";

function EditProductModal({ product, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productRepetition: "",
    productType: "",
    time: "",
    productPrice: "",
    ...product,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newProduct); //add the fetch here

    setLoading(true);

    setTimeout(() => {
      alert("Product updated successfully");
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
      setOpen={setOpen}
      className="max-w-[400px] flex items-center justify-center flex-col right"
      layer="50"
    >
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">تعديل منتج</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-2 text-right gap-2">
          <label className="col-span-1 mb-1 order-1" htmlFor="productName">
            اسم المنتج
          </label>
          <label className="col-span-1 mb-1 order-2" htmlFor="productPrice">
            سعر المنتج
          </label>
          <Input
            value={newProduct.productName || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
            id="productName"
            className="col-span-1 order-3 mb-2"
            type="text"
            required
          />
          <Input
            value={newProduct.productPrice || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productPrice: e.target.value })
            }
            id="productPrice"
            className="col-span-1 order-4 mb-2"
            type="number"
            required
          />
          <label htmlFor="productType" className="col-span-2 mb-1 order-5">
            نوع المنتج
          </label>
          <Input
            value={newProduct.productType || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productType: e.target.value })
            }
            id="productType"
            className="col-span-2 mb-4 order-6"
            type="text"
            required
          />
          <label
            htmlFor="productRepetition"
            className="col-span-1 mb-1 order-7"
          >
            تكرارية المنتج
          </label>
          <label htmlFor="time" className="col-span-1 mb-1 order-8">
            المدة
          </label>
          <Input
            value={newProduct.productRepetition || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                productRepetition: e.target.value,
              })
            }
            id="productRepetition"
            className="col-span-1 mb-4 order-9"
            type="text"
            required
          />
          <Input
            value={newProduct.time || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, time: e.target.value })
            }
            id="time"
            className="col-span-1 mb-4 order-10"
            type="number"
            required
          />
        </div>
        <div className="w-full h-9 flex-row-reverse flex justify-between items-center">
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            className="h-full w-20"
            onClick={() => {
              setOpen(false); // Close the modal
              setNewProduct({
                productName: "",
                productPrice: "",
                productType: "",
                productRepetition: "",
                time: "",
              });
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            type="submit"
            className={`h-full w-20 transition-all duration-300 ease-in ${
              loading &&
              "opacity-50 w-32 flex flex-row-reverse gap-2 cursor-not-allowed"
            }`}
          >
            <p className="right transition-all duration-300 ease-in">اضافة</p>
            <span className="block scale-75">{loading && <Loader />}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditProductModal;
