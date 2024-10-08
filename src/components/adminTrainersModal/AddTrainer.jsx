"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";
import { debounce } from "lodash";

function AddTrainer({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: null,
  });
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Validation function for phone numbers
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(07|9647)\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Debounced function for validating phone numbers
  const handlePhoneNumberChange = debounce((value, phoneType) => {
    const trimmedValue = value.trim();
    if (validatePhoneNumber(trimmedValue)) {
      setErrors(() => ({
        ...errors,
        [phoneType]: null,
      }));
    } else {
      setErrors(() => ({
        ...errors,
        [phoneType]: "الرقم الذي ادخلته غير صالح",
      }));
    }
  }, 300);

  // Handle input change and validation
  const handleChange = (e, phoneType) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setNewTrainer((prevState) => ({
      ...prevState,
      [phoneType]: numericValue,
    }));
    handlePhoneNumberChange(numericValue, phoneType);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newTrainer); //add the fetch here
    setLoading(true);
    setTimeout(() => {
      alert("trainer added successfully");
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
      className="max-w-[500px] min-w-[340px] flex items-center justify-center flex-col right"
      layer="50"
    >
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">اضافة مدرب</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 w-full">
          <label htmlFor="name" className="text-[14px] block w-full mb-1.5">
            الاسم الكامل
          </label>
          <Input
            id="name"
            type="text"
            value={newTrainer.name}
            onChange={(e) =>
              setNewTrainer({ ...newTrainer, name: e.target.value })
            }
            className="w-full mb-3"
          />

          <label
            htmlFor="firstPhoneNumber"
            className="text-[14px] block w-full mb-1.5"
          >
            رقم الهاتف
          </label>

          <Input
            id="firstPhoneNumber"
            type="text"
            value={newTrainer.phoneNumber}
            onChange={(e) => handleChange(e, "phoneNumber")}
            className={`w-full mb-3 ${
              errors.phoneNumber && "ring-1 ring-red-500"
            }`}
          />
          <label htmlFor="email" className="text-[14px] block w-full mb-1.5">
            البريد الالكتروني
          </label>
          <Input
            id="email"
            type="text"
            value={newTrainer.email}
            onChange={(e) =>
              setNewTrainer({ ...newTrainer, email: e.target.value })
            }
            className="w-full mb-3"
          />
          <label htmlFor="password" className="text-[14px] block w-full mb-1.5">
            كلمة المرور
          </label>
          <Input
            id="password"
            type="password"
            value={newTrainer.password}
            onChange={(e) =>
              setNewTrainer({ ...newTrainer, password: e.target.value })
            }
            className="w-full mb-3"
          />
          <label
            htmlFor="password2"
            className="text-[14px] block w-full mb-1.5"
          >
            تأكيد كلمة المرور
          </label>
          <Input
            id="password2"
            type="password"
            value={newTrainer.confirmPassword}
            onChange={(e) =>
              setNewTrainer({ ...newTrainer, confirmPassword: e.target.value })
            }
            className="w-full mb-3"
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
              setNewTrainer({
                id: "",
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              });
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            disabled={
              errors.phoneNumber ||
              !newTrainer.name ||
              !newTrainer.email ||
              !newTrainer.password ||
              !newTrainer.confirmPassword ||
              newTrainer.password !== newTrainer.confirmPassword
            }
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

export default AddTrainer;
