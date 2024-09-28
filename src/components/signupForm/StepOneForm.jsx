"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Button_one from "../customButtons/Button_one";
import { debounce } from "lodash";

function StepOneForm({ signupInfo, setSignupInfo, step, loading }) {
  // State to track validation errors
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
      setErrors((prevState) => ({
        ...prevState,
        [phoneType]: null,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [phoneType]: "الرقم الذي ادخلته غير صالح",
      }));
    }
  }, 300);

  // Handle input change and validation
  const handleChange = (e, phoneType) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setSignupInfo((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        [phoneType]: numericValue,
      },
    }));
    handlePhoneNumberChange(numericValue, phoneType);
  };

  return (
    <>
      <Input
        value={signupInfo.userInfo.name || ""}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            userInfo: { ...signupInfo.userInfo, name: e.target.value },
          })
        }
        type="text"
        placeholder="الاسم الكامل"
        className="col-span-6 h-12 placeholder:h-6 right"
        required
      />

      <div className="col-span-6 h-12 flex flex-row-reverse gap-2">
        <Input
          type="text"
          maxLength={14}
          placeholder="رقم الهاتف"
          value={signupInfo.userInfo.phone}
          onChange={(e) => handleChange(e, "phone")}
          inputMode="numeric"
          className={`h-full placeholder:h-6 placeholder:text-right
            ${errors.phone && "ring-1 ring-red-500"}`}
          required
        />

        <Input
          type="text"
          maxLength={14}
          placeholder="رقم الهاتف الثاني"
          value={signupInfo.userInfo.sec_phone}
          onChange={(e) => handleChange(e, "sec_phone")}
          inputMode="numeric"
          className={`h-full placeholder:h-6 placeholder:text-right
           ${errors.sec_phone && "ring-1 ring-red-500"}`}
          required
        />
      </div>

      <Input
        type="email"
        value={signupInfo.userInfo.email}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            userInfo: { ...signupInfo.userInfo, email: e.target.value },
          })
        }
        placeholder="البريد الالكتروني"
        className="col-span-6 h-12 placeholder:h-6 placeholder:text-right"
        required
      />

      <div className="col-span-6 h-12 flex flex-row-reverse gap-2">
        <Input
          type="text"
          placeholder="البلد"
          value={signupInfo.businessInfo.country}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                country: e.target.value,
              },
            })
          }
          className="h-full placeholder:h-6 right"
          required
        />

        <Input
          type="text"
          placeholder="المحافظة"
          value={signupInfo.businessInfo.state}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                state: e.target.value,
              },
            })
          }
          className="h-full placeholder:h-6 right"
          required
        />
      </div>
      <Button_one
        step={step}
        loading={loading}
        disabled={
          errors.phone ||
          errors.sec_phone ||
          !signupInfo.businessInfo.country ||
          !signupInfo.businessInfo.state ||
          !signupInfo.userInfo.email ||
          !signupInfo.userInfo.name
        }
      />
    </>
  );
}

export default StepOneForm;
