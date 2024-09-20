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
    country: "",
    location: "",
    firstPhoneNumber: "",
    secondPhoneNumber: "",
    instagram_user: "",
    dateOfBirth: "",
    ...customer,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstPhoneNumber: null,
    secondPhoneNumber: null,
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
    <Modal open={open} className={"max-w-[500px] min-w-[200px]"}>
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">تعديل معلومات العميل</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit} className="right ">
        <div className="w-full grid grid-cols-3 gap-2 mb-4">
          <label
            htmlFor="name"
            className="w-full block text-right col-span-2 order-1 text-[12px]"
          >
            الاسم كامل
          </label>
          <label
            htmlFor="insta"
            className="w-full block text-right col-span-1 order-2 text-[12px]"
          >
            معرف الانستغرام
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
            className="col-span-2 order-3"
            type="text"
            required
          />
          <Input
            value={customerInfo.instagram_user || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                instagram_user: e.target.value,
              })
            }
            id="insta"
            className="col-span-1 order-4"
            type="text"
            required
          />
        </div>

        <div className="w-full grid grid-cols-6 gap-2 mb-4">
          <label className="col-span-1 order-1 text-[12px]" htmlFor="age">
            العمر
          </label>
          <label className="col-span-2 order-2 text-[12px]" htmlFor="gender">
            الجنس
          </label>
          <label className="col-span-3 order-3 text-[12px]" htmlFor="date">
            تاريخ الميلاد
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
            className="col-span-1 order-3"
            type="number"
            required
          />
          <select
            defaultValue={customerInfo.gender || ""}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, gender: e.target.value })
            }
            className="col-span-2 order-4 border rounded-md p-2 placeholder:p-2 bg-transparent"
            id="gender"
            required
          >
            <option value="ذكر">ذكر</option>
            <option value="انثى">انثى</option>
          </select>
          <input
            id="date"
            value={customerInfo.dateOfBirth || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                dateOfBirth: e.target.value,
              })
            }
            className="col-span-3 order-5 border rounded-md p-2 bg-transparent"
            type="date"
            required
          />
        </div>
        <label
          htmlFor="address"
          className="mb-1 w-full block text-right text-[12px]"
        >
          الموقع الكامل
        </label>
        <Input
          value={customerInfo.location || ""}
          onChange={(e) =>
            setCustomerInfo({
              ...customerInfo,
              location: e.target.value,
            })
          }
          id="address"
          className="mb-4 w-full"
          type="text"
          required
        />
        <div className="w-full grid grid-cols-3 gap-2 mb-4">
          <label className="col-span-1 order-1 text-[12px]" htmlFor="country">
            البلد
          </label>
          <label className="col-span-1 order-2 text-[12px]" htmlFor="city">
            المحافظة
          </label>
          <label className="col-span-1 order-3 text-[12px]" htmlFor="subCity">
            المدينة
          </label>
          <Input
            value={customerInfo.country || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                country: e.target.value,
              })
            }
            id="country"
            className="w-full order-4"
            type="text"
            required
          />
          <Input
            id="city"
            value={customerInfo.city || ""}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                city: e.target.value,
              })
            }
            className="col-span-1 order-5"
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
            className="col-span-1 order-6"
            type="text"
            required
          />
        </div>

        <div className="w-full grid grid-cols-2 mb-4 gap-2">
          <label
            htmlFor="firstPhoneNumber"
            className="col-span-1 block text-right order-1 text-[12px]"
          >
            رقم الهاتف الاول
          </label>
          <label
            htmlFor="secondPhoneNumber"
            className="col-span-1 block text-right order-2 text-[12px]"
          >
            رقم الهاتف الثاني
          </label>
          <Input
            id="phone"
            value={customerInfo.firstPhoneNumber || ""}
            onChange={(e) => handleChange(e, "firstPhoneNumber")}
            className={`col-span-1 order-3 ${
              errors.firstPhoneNumber && "ring-1 ring-red-500"
            }`}
            type="text"
            required
          />
          <Input
            id="phone"
            value={customerInfo.secondPhoneNumber || ""}
            onChange={(e) => handleChange(e, "secondPhoneNumber")}
            className={`col-span-1 order-4 ${
              errors.secondPhoneNumber && "ring-1 ring-red-500"
            }`}
            type="text"
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
              errors.firstPhoneNumber ||
              errors.secondPhoneNumber ||
              !customerInfo.name ||
              !customerInfo.age ||
              !customerInfo.gender ||
              !customerInfo.city ||
              !customerInfo.subCity ||
              !customerInfo.country ||
              !customerInfo.dateOfBirth ||
              !customerInfo.location ||
              !customerInfo.instagram_user
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
