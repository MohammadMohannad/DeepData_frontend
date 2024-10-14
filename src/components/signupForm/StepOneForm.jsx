"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Button_one from "../customButtons/Button_one";
import { debounce } from "lodash";

function StepOneForm({ signupInfo, setSignupInfo, step, loading }) {
  // State to track validation errors
  const [errors, setErrors] = useState({});

  // Validation function for phone numbers
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(07|9647|\+9647)\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Debounced function for validating phone numbers
  const handlePhoneNumberChange = debounce((value, phoneType) => {
    const trimmedValue = value.trim();

    if (validatePhoneNumber(trimmedValue) || trimmedValue === "") {
      setErrors((prevState) => ({
        ...prevState,
        [phoneType]: null,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [phoneType]: "ادخال خطأ جرب صيغة رقم يبدأ ب 9647+, 9647 او 07",
      }));
    }
  }, 1000);

  // Handle input change and validation
  const handleChange = (e, phoneType) => {
    let { value } = e.target;

    // Allow '+' at the start and remove other non-numeric characters
    if (value.startsWith("+")) {
      value = "+" + value.slice(1).replace(/\D/g, ""); // Keep '+' at the start
    } else {
      value = value.replace(/\D/g, ""); // Remove non-numeric characters
    }

    setSignupInfo((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        [phoneType]: value,
      },
    }));

    handlePhoneNumberChange(value, phoneType);
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
          inputMode="tel"
          pattern="^\+?[0-9]*$"
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
          inputMode="tel"
          pattern="^\+?[0-9]*$"
          className={`h-full placeholder:h-6 placeholder:text-right
            ${
              errors.sec_phone &&
              signupInfo.userInfo.sec_phone &&
              "ring-1 ring-red-500"
            }`}
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
          !signupInfo.userInfo.phone ||
          (!signupInfo.businessInfo.sec_phone && errors.sec_phone) ||
          !signupInfo.businessInfo.country ||
          !signupInfo.businessInfo.state ||
          !signupInfo.userInfo.email ||
          !signupInfo.userInfo.name
        }
      />

      {errors.phone && (
        <p className="text-red-400 text-sm col-span-6 whitespace-nowrap text-right">
          {errors.phone}
        </p>
      )}
      {errors.sec_phone && (
        <p className="text-red-400 text-sm col-span-6 whitespace-nowrap text-right">
          {errors.sec_phone}
        </p>
      )}
    </>
  );
}

export default StepOneForm;
