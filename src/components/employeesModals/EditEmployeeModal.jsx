"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Button } from "../ui/button";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";
import { debounce } from "lodash";

function EditEmployeeModal({ employee, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: null,
    sec_phone: null,
  });
  const [newEmployee, setNewEmployee] = useState({
    id: employee?.id || "",
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    sec_phone: employee?.sec_phone || "",
    password: employee?.password || "",
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

  // Function to get the updated fields only
  const getUpdatedFields = () => {
    const updatedFields = {};
    for (const key in newEmployee) {
      if (newEmployee[key] !== employee[key] && newEmployee[key] !== "") {
        updatedFields[key] = newEmployee[key];
      }
    }
    return updatedFields;
  };

  // PATCH request using Axios (sending only updated fields)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const updatedFields = getUpdatedFields();
    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${newEmployee.id}`, updatedFields, {withCredentials:true});
      console.log("Employee updated successfully:", response.data);

      alert("Employee updated successfully");
      setLoading(false);
      setOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
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
              htmlFor="phone"
              className="col-span-1 text-[14px] block w-full order-1"
            >
              رقم الهاتف الاول
            </label>
            <label
              htmlFor="sec_phone"
              className="col-span-1 text-[14px] block w-full order-2"
            >
              رقم الهاتف الثاني
            </label>
            <Input
              id="phone"
              type="text"
              value={newEmployee.phone}
              onChange={(e) => handleChange(e, "phone")}
              className={`col-span-1 order-3 ${
                errors.phone && "ring-1 ring-red-500"
              }`}
            />
            <Input
              id="sec_phone"
              type="text"
              value={newEmployee.sec_phone}
              onChange={(e) => handleChange(e, "sec_phone")}
              className={`col-span-1 order-4 ${
                errors.sec_phone && "ring-1 ring-red-500"
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
                phone: "",
                sec_phone: "",
                password: "",
              });
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            disabled={loading || !Object.keys(getUpdatedFields()).length}
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
