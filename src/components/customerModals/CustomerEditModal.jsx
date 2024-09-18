"use client";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../loader/Loader";
import { debounce } from "lodash";

function CustomerEditModal({ open, setOpen, customer }) {
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    city: "",
    subCity: "",
    pointOfReference: "",
    phoneNumber: "",
    ...customer,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: null,
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
        [phoneType]: null,
      }));
    } else {
      setErrors(() => ({
        [phoneType]: "الرقم الذي ادخلته غير صالح",
      }));
    }
  }, 300);

  // Handle input change and validation
  const handleChange = (e, phoneType) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setCustomerInfo((prevState) => ({
      ...prevState,
      [phoneType]: numericValue,
    }));
    handlePhoneNumberChange(numericValue, phoneType);
  };

  const handleSubmit = (event) => {
    //integration start here
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("update customer");
      console.log(customerInfo);
      setLoading(false);
      setOpen(false);
    }, 5000);
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
    <Modal open={open}>
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">تعديل معلومات العميل</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit} className="right">
        <label htmlFor="name" className="mb-1 w-full block text-right">
          الاسم كامل
        </label>
        <Input
          value={customerInfo.name || ""}
          onChange={(e) =>
            setCustomerInfo({
              ...customerInfo,
              name: e.target.value,
            })
          }
          id="name"
          className="mb-2 w-full"
          type="text"
          required
        />
        <div className="w-full grid grid-cols-2 gap-2">
          <label className="col-span-1 mb-1 order-1" htmlFor="age">
            العمر
          </label>
          <label className="col-span-1 mb-1 order-2" htmlFor="gender">
            الجنس
          </label>
          <Input
            id="age"
            value={customerInfo.age || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                age: e.target.value,
              })
            }
            className="col-span-1 order-3 mb-2"
            type="number"
            required
          />
          <select
            defaultValue={customerInfo.gender || ""}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, gender: e.target.value })
            }
            className="col-span-1 order-4 mb-2 border rounded-md p-2 placeholder:p-2 bg-transparent"
            id="gender"
            required
          >
            <option value="ذكر">ذكر</option>
            <option value="انثى">انثى</option>
          </select>
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <label className="col-span-1 mb-1 order-1" htmlFor="city">
            المحافظة
          </label>
          <label className="col-span-1 mb-1 order-2" htmlFor="subCity">
            المدينة
          </label>
          <Input
            id="city"
            value={customerInfo.city || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                city: e.target.value,
              })
            }
            className="col-span-1 order-3 mb-2"
            type="text"
            required
          />
          <Input
            id="subCity"
            value={customerInfo.subCity || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                subCity: e.target.value,
              })
            }
            className="col-span-1 order-4 mb-2"
            type="text"
            required
          />
        </div>

        <label htmlFor="address" className="mb-1 w-full block text-right">
          اقرب نقطة دالة
        </label>
        <Input
          value={customerInfo.pointOfReference || ""}
          onChange={(e) =>
            setCustomerInfo({
              ...customerInfo,
              pointOfReference: e.target.value,
            })
          }
          id="address"
          className="mb-2 w-full"
          type="text"
          required
        />

        <label htmlFor="phone" className="mb-1 w-full block text-right">
          رقم الهاتف
        </label>
        <Input
          id="phone"
          value={customerInfo.phoneNumber || ""}
          onChange={(e) => handleChange(e, "phoneNumber")}
          className={`mb-2 w-full ${
            errors.phoneNumber && "ring-1 ring-red-500"
          }`}
          type="text"
          required
        />

        <div className="w-full h-9 flex-row-reverse flex justify-between items-center">
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            className="h-full w-20"
            onClick={() => {
              setOpen(false); // Close the modal
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
            disabled={
              loading ||
              errors.phoneNumber ||
              !customerInfo.name ||
              !customerInfo.age ||
              !customerInfo.gender ||
              !customerInfo.city ||
              !customerInfo.subCity ||
              !customerInfo.pointOfReference
            }
          >
            <p className="right transition-all duration-300 ease-in">اضافة</p>
            <span className="block scale-75">{loading && <Loader />}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CustomerEditModal;
