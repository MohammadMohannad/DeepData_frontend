"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Button } from "../ui/button";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";

function EditProductModal({ product, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: product?.name || "",
    periodicity_type: product?.periodicity_type || "",
    priod: product?.priod || "",
    price: product?.price || "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // PATCH request to update the product
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${product.id}`, newProduct, {withCredentials:true});
      console.log('Product updated successfully:', response.data);

      alert("Product updated successfully");
      setLoading(false);
      setOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
      setLoading(false);
    }
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
          <label className="col-span-1 mb-1 order-1" htmlFor="name">
            اسم المنتج
          </label>
          <label className="col-span-1 mb-1 order-2" htmlFor="price">
            سعر المنتج
          </label>
          <Input
            value={newProduct.name || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            id="name"
            className="col-span-1 order-3 mb-2"
            type="text"
            required
          />
          <Input
            value={newProduct.price || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            id="price"
            className="col-span-1 order-4 mb-2"
            type="number"
          />
          <label
            htmlFor="periodicity_type"
            className="col-span-1 mb-1 order-7"
          >
            تكرارية المنتج
          </label>
          <label htmlFor="priod" className="col-span-1 mb-1 order-8">
            المدة
          </label>
          <Input
            value={newProduct.periodicity_type || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                periodicity_type: e.target.value,
              })
            }
            id="periodicity_type"
            className="col-span-1 mb-4 order-9"
            type="text"
          />
          <Input
            value={newProduct.priod || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, priod: e.target.value })
            }
            id="priod"
            className="col-span-1 mb-4 order-10"
            type="number"
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
                name: "",
                price: "",
                periodicity_type: "",
                priod: "",
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
