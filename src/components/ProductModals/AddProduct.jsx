"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";
import axios from "axios";

function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    productRepetition: "",
    productType: "",
    time: "",
    productPrice: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:3002/api/v1/templates", {
     
          name: template.name,
          content: template.content,
          entity_id: template.entity_id, // Include this if necessary
        
      },{
        withCredentials: true
      });
      
      console.log("Response:", response.data);
      alert("Template added successfully");
      setTemplate({ entity_id: store.entity_id, name: "", content: "" }); // Reset the form
      setOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding template:", error);
      alert("Failed to add template");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Add or remove the overflow-hidden class based on the open state
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to ensure the class is removed when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      <Button
        variant="default"
        className="w-[55%] min-h-full bg-green_1 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={18} />
        <span className="text-[12px] text-white">اضافة منتج</span>
      </Button>
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        className="max-w-[400px] flex items-center justify-center flex-col right"
      >
        <div className="w-full text-right mb-4">
          <h2 className="text-base font-semibold">اضافة منتج</h2>
          <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-2 text-right gap-2">
            <label className="col-span-1 mb-1 order-1" htmlFor="name">
              اسم المنتج
            </label>
            <label className="col-span-1 mb-1 order-2" htmlFor="productPrice">
              سعر المنتج
            </label>
            <Input
              vlaue={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              id="name"
              className="col-span-1 order-3 mb-2"
              type="text"
              required
            />
            <Input
              vlaue={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
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
              vlaue={product.productType}
              onChange={(e) =>
                setProduct({ ...product, productType: e.target.value })
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
              vlaue={product.productRepetition}
              onChange={(e) =>
                setProduct({ ...product, productRepetition: e.target.value })
              }
              id="productRepetition"
              className="col-span-1 mb-4 order-9"
              type="text"
              required
            />
            <Input
              vlaue={product.time}
              onChange={(e) => setProduct({ ...product, time: e.target.value })}
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
                setIsOpen(false); // Close the modal
                setProduct({
                  name: "",
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
    </>
  );
}

export default AddProductForm;
