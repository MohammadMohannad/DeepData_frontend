"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";
import { debounce } from "lodash";

function EditEmployeeModal({ employee, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstPhoneNumber: null,
    secondPhoneNumber: null,
  });
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    firstPhoneNumber: "",
    secondPhoneNumber: "",
    password: "",
    ...employee,
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
    setNewEmployee((prevState) => ({
      ...prevState,
      [phoneType]: numericValue,
    }));
    handlePhoneNumberChange(numericValue, phoneType);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newEmployee); //add the fetch here

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
      className="max-w-[500px] min-w-[250px] flex items-center justify-center flex-col right"
      layer="50"
    >
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">تعديل معلومات الموظف</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 w-full">
          <label htmlFor="name" className="text-[14px] block w-full mb-1.5">
            الاسم
          </label>
          <Input
            id="name"
            type="text"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="w-full mb-3"
          />

          <div className="mb-3 w-full grid grid-cols-2 gap-1.5">
            <label
              htmlFor="firstPhoneNumber"
              className="col-span-1 text-[14px] block w-full order-1"
            >
              رقم الهاتف الاول
            </label>
            <label
              htmlFor="secondPhoneNumber"
              className="col-span-1 text-[14px] block w-full order-2"
            >
              رقم الهاتف الثاني
            </label>
            <Input
              id="firstPhoneNumber"
              type="text"
              value={newEmployee.firstPhoneNumber}
              onChange={(e) => handleChange(e, "firstPhoneNumber")}
              className={`col-span-1 order-3 ${
                errors.firstPhoneNumber && "ring-1 ring-red-500"
              }`}
            />
            <Input
              id="secondPhoneNumber"
              type="text"
              value={newEmployee.secondPhoneNumber}
              onChange={(e) => handleChange(e, "secondPhoneNumber")}
              className={`col-span-1 order-4 ${
                errors.secondPhoneNumber && "ring-1 ring-red-500"
              }`}
            />
          </div>
          <label htmlFor="email" className="text-[14px] block w-full mb-1.5">
            البريد الالكتروني
          </label>
          <Input
            id="email"
            type="text"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            className="w-full mb-3"
          />
          <label htmlFor="password" className="text-[14px] block w-full mb-1.5">
            كلمة المرور
          </label>
          <Input
            id="password"
            type="password"
            value={newEmployee.password}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, password: e.target.value })
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
              setNewEmployee({
                id: "",
                name: "",
                email: "",
                firstPhoneNumber: "",
                secondPhoneNumber: "",
                password: "",
              });
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            disabled={
              errors.firstPhoneNumber ||
              errors.secondPhoneNumber ||
              !newEmployee.name ||
              !newEmployee.email ||
              !newEmployee.password
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

export default EditEmployeeModal;
