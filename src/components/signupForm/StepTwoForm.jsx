"use client";
import React, { useState } from "react";
import { FileUploader } from "../fileUploader/FileUploader";
import Button_one from "../customButtons/Button_one";
import { Input } from "../ui/input";
import { debounce } from "lodash";

function StepTwoForm({ signupInfo, setSignupInfo, step, loading }) {
  // State to track validation errors
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
    setSignupInfo((prevState) => ({
      ...prevState,
      businessInfo: {
        ...prevState.businessInfo,
        [phoneType]: numericValue,
      },
    }));
    handlePhoneNumberChange(numericValue, phoneType);
  };

  return (
    <>
      <div className="col-span-6 h-12 flex flex-row-reverse gap-2">
        <Input
          value={signupInfo.businessInfo.businessName}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                businessName: e.target.value,
              },
            })
          }
          type="text"
          placeholder="اسم المشروع"
          className="h-full right placeholder:h-6 placeholder:text-right"
          required
        />
        <Input
          value={signupInfo.businessInfo.type}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                type: e.target.value,
              },
            })
          }
          type="text"
          placeholder="النوع (مثال: كوزمتك)"
          className="h-full placeholder:h-6 placeholder:text-right"
          required
        />
      </div>
      <Input
        type="text"
        maxLength={14}
        value={signupInfo.businessInfo.phoneNumber}
        onChange={(e) => {
          handleChange(e, "phoneNumber");
        }}
        placeholder="هاتف المشروع"
        inputMode="numeric"
        className={`col-span-6 h-12 placeholder:h-6 placeholder:text-right ${
          errors.phoneNumber && "ring-1 ring-red-500"
        }`}
        required
      />
      <Input
        value={signupInfo.businessInfo.instagramLink}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              instagramLink: e.target.value,
            },
          })
        }
        type="text"
        placeholder="رابط صفحة الانستغرام"
        className="col-span-6 h-12 placeholder:h-6 placeholder:text-right"
        required
      />
      <Input
        value={signupInfo.businessInfo.meta_id}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              meta_id: e.target.value,
            },
          })
        }
        type="text"
        placeholder="رابط صفحة الفيسبوك"
        className="col-span-6 h-12 placeholder:h-6 placeholder:text-right"
        required
      />
      <FileUploader
        className={"col-span-6 h-18"}
        onFileChange={(selectedFile) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              businessLogo: selectedFile,
            },
          })
        }
      />
      <Button_one
        step={step}
        loading={loading}
        disabled={
          errors.phoneNumber ||
          !signupInfo.businessInfo.businessLogo ||
          !signupInfo.businessInfo.meta_id ||
          !signupInfo.businessInfo.instagramLink ||
          !signupInfo.businessInfo.businessName ||
          !signupInfo.businessInfo.type
        }
      />
    </>
  );
}

export default StepTwoForm;
