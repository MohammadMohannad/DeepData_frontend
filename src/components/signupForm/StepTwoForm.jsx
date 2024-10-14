"use client";
import React, { useState } from "react";
import { FileUploader } from "../fileUploader/FileUploader";
import Button_one from "../customButtons/Button_one";
import { Input } from "../ui/input";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function StepTwoForm({ signupInfo, setSignupInfo, step, loading }) {
  const entity_types = [
    { value: "كوزمتك" },
    { value: "ملابس" },
    { value: "اكسسوارات" },
    { value: "الكترونيات" },
  ];

  // Handle entity type change
  const handleEntityTypeChange = (value) => {
    setSignupInfo((prevState) => ({
      ...prevState,
      businessInfo: {
        ...prevState.businessInfo,
        entity_type: value, // Store selected entity type in signupInfo
      },
    }));
  };

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
    if (value.startsWith("+")) {
      value = "+" + value.slice(1).replace(/\D/g, "");
    } else {
      value = value.replace(/\D/g, "");
    }
    setSignupInfo((prevState) => ({
      ...prevState,
      businessInfo: {
        ...prevState.businessInfo,
        [phoneType]: value, // Fixed numericValue to value
      },
    }));
    handlePhoneNumberChange(value, phoneType); // Fixed numericValue to value
  };

  return (
    <>
      <div className="col-span-6 grid grid-cols-2 h-12 gap-2">
        <Input
          value={signupInfo.businessInfo.name}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                name: e.target.value,
              },
            })
          }
          type="text"
          placeholder="اسم المشروع"
          className="col-span-1 order-2 h-full right placeholder:h-6 placeholder:text-right"
          required
        />
        <Select
          dir="rtl"
          onValueChange={handleEntityTypeChange}
          value={signupInfo.businessInfo.entity_type} // Make sure to set the value
        >
          <SelectTrigger className="col-span-1 h-full order-1">
            <SelectValue
              placeholder={
                <span className="text-muted-foreground">نوع المشروع</span>
              }
              className="h-full"
            >
              {signupInfo.businessInfo.entity_type || ""}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {entity_types.map((entity, i) => (
                <SelectItem key={i} value={entity.value}>
                  {entity.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Input
        type="text"
        maxLength={14}
        value={signupInfo.businessInfo.entity_phone}
        onChange={(e) => {
          handleChange(e, "entity_phone");
        }}
        placeholder="هاتف المشروع"
        inputMode="numeric"
        className={`col-span-6 h-12 placeholder:h-6 placeholder:text-right ${
          errors.entity_phone && "ring-1 ring-red-500"
        }`}
      />
      <Input
        value={signupInfo.businessInfo.instagram_user}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              instagram_user: e.target.value,
            },
          })
        }
        type="text"
        placeholder="رابط صفحة الانستغرام"
        className="col-span-6 h-12 placeholder:h-6 placeholder:text-right"
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
      />
      <FileUploader
        className={"col-span-6 h-18"}
        file={signupInfo.businessInfo.logo}
        onFileChange={(selectedFile) => {
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              logo: selectedFile,
            },
          });
        }}
      />
      <Button_one
        step={step}
        loading={loading}
        onClick={() => console.log(signupInfo)}
        disabled={
          !signupInfo.businessInfo.name ||
          errors.entity_phone ||
          !signupInfo.businessInfo.entity_type
        }
      />
      {errors.entity_phone && (
        <p className="text-red-400 col-span-6 text-right text-xs">
          {errors.entity_phone}
        </p>
      )}
    </>
  );
}

export default StepTwoForm;
