"use client";
import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import { debounce } from "lodash";
import { Button } from "../ui/button";
import Loader from "../loader/Loader";
import { FileUploader } from "../fileUploader/FileUploader";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddStore({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  // State structure similar to signupInfo in SignupForm
  const [storeInfo, setStoreInfo] = useState({
    userInfo: {
      name: "",
      email: "",
      phone: "",
      sec_phone: "",
      password: "",
    },
    businessInfo: {
      name: "",
      businessPhoneNumber: "",
      instagram_user: "",
      meta_id: "",
      logo: null,
      country: "",
      state: "",
      type: "",
    },
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: null,
    sec_phone: null,
    businessPhoneNumber: null,
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
      setErrors((prevErrors) => ({
        ...prevErrors,
        [phoneType]: null,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [phoneType]: "الرقم الذي ادخلته غير صالح",
      }));
    }
  }, 300);

  // Handle input change and validation
  const handleChange = (e, phoneType, section) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setStoreInfo((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [phoneType]: numericValue,
      },
    }));
    handlePhoneNumberChange(numericValue, phoneType);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    if (step === 2) {
      try {
        const formData = new FormData();

        // Append userInfo fields
        Object.keys(storeInfo.userInfo).forEach((key) => {
          formData.append(`userInfo[${key}]`, storeInfo.userInfo[key]);
        });

        // Append businessInfo fields, including the logo if present
        Object.keys(storeInfo.businessInfo).forEach((key) => {
          if (key === "logo" && storeInfo.businessInfo.logo) {
            formData.append("businessInfo[logo]", storeInfo.businessInfo.logo);
          } else {
            formData.append(`businessInfo[${key}]`, storeInfo.businessInfo[key]);
          }
        });

        // Append passwords
        

        // Axios POST request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        // Redirect to login page on success
        router.push("/login");
        setSuccessMessage("Signup successful! You can now log in.");
      } catch (error) {
        console.error("Error during signup:", error);
        setErrorMessage(
          error.response?.data?.error || "Signup failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <Modal open={open} className={"max-w-[500px] min-w-[200px]"}>
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">اضافة متجر</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>

      <form onSubmit={handleSubmit} dir="rtl">
        {step === 1 && (
          <>
            <label htmlFor="name" className="text-sm block mb-2 text-right">
              الاسم الكامل
            </label>
            <Input
              label="الاسم الكامل"
              type="text"
              value={storeInfo.userInfo.name}
              onChange={(e) =>
                setStoreInfo((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, name: e.target.value },
                }))
              }
              required
              id="name"
              className="mb-4"
            />
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <label htmlFor="number" className="mb-1 col-span-1 block text-right text-[12px]">
                رقم الهاتف
              </label>
              <label htmlFor="number2" className="mb-1 col-span-1 block text-right text-[12px]">
                رقم الهاتف الثاني
              </label>
              <Input
                value={storeInfo.userInfo.phone || ""}
                onChange={(e) => handleChange(e, "phone", "userInfo")}
                className={`col-span-1 ${errors.phone && "ring-1 ring-red-500"}`}
                id="number"
                type="text"
                required
              />
              <Input
                value={storeInfo.userInfo.sec_phone || ""}
                onChange={(e) => handleChange(e, "sec_phone", "userInfo")}
                className={`col-span-1 ${errors.sec_phone && "ring-1 ring-red-500"}`}
                id="number2"
                type="text"
                required
              />
            </div>
            <label htmlFor="email" className="text-sm block mb-2 text-right">
              البريد الالكترونى
            </label>
            <Input
              label="البريد الالكترونى"
              type="text"
              value={storeInfo.userInfo.email}
              onChange={(e) =>
                setStoreInfo((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, email: e.target.value },
                }))
              }
              required
              id="email"
              className="mb-4"
            />
          </>
        )}

        {step === 2 && (
          <>
            <label htmlFor="bnumber" className="text-sm block mb-2 text-right">
              هاتف المشروع
            </label>
            <Input
              value={storeInfo.businessInfo.businessPhoneNumber || ""}
              onChange={(e) =>
                handleChange(e, "businessPhoneNumber", "businessInfo")
              }
              className={`mb-4 w-full ${
                errors.businessPhoneNumber && "ring-1 ring-red-500"
              }`}
              id="bnumber"
              type="text"
              required
            />
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <label htmlFor="face" className="mb-1 col-span-1 block text-right text-[12px]">
                رابط الفيسبوك
              </label>
              <label htmlFor="insta" className="mb-1 col-span-1 block text-right text-[12px]">
                رابط الانستغرام
              </label>
              <Input
                value={storeInfo.businessInfo.meta_id || ""}
                onChange={(e) =>
                  setStoreInfo((prev) => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, meta_id: e.target.value },
                  }))
                }
                className={"col-span-1"}
                id="face"
                type="text"
                required
              />
              <Input
                value={storeInfo.businessInfo.instagram_user || ""}
                onChange={(e) =>
                  setStoreInfo((prev) => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, instagram_user: e.target.value },
                  }))
                }
                className={"col-span-1"}
                id="insta"
                type="text"
                required
              />
            </div>
            <FileUploader
              onFileChange={(selectedFile) =>
                setStoreInfo((prev) => ({
                  ...prev,
                  businessInfo: { ...prev.businessInfo, logo: selectedFile },
                }))
              }
            />
            <label htmlFor="password" className="text-sm mt-6 block mb-2 text-right">
              كلمة المرور
            </label>
            <Input
              type="password"
              id="password"
              required
              onChange={(e) =>
                setStoreInfo((prev) => ({
                  ...prev,
                  userInfo: { ...prev.userInfo, password: e.target.value },
                }))
              }
              value={storeInfo.password || ""}
              className={"mb-4 w-full"}
            />
            <label htmlFor="cpassword" className="text-sm block mb-2 text-right">
              تأكيد كلمة المرور
            </label>
            <Input
              type="password"
              id="cpassword"
              required
              onChange={(e) =>
                setStoreInfo((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              value={storeInfo.confirmPassword || ""}
              className={"mb-4 w-full"}
            />
          </>
        )}

        <div className="w-full h-9 flex-row-reverse flex justify-between items-center">
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            className="h-full w-20"
            onClick={() => {
              setStoreInfo({
                userInfo: {
                  name: "",
                  email: "",
                  phone: "",
                  sec_phone: "",
                },
                businessInfo: {
                  name: "",
                  businessPhoneNumber: "",
                  instagram_user: "",
                  meta_id: "",
                  logo: null,
                  country: "",
                  state: "",
                  type: "",
                },
                password: "",
                confirmPassword: "",
              });
              setOpen(false);
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            type={step === 2 ? "submit" : "button"}
            className={`h-full w-20 transition-all duration-300 ease-in ${
              loading &&
              "opacity-50 w-32 flex flex-row-reverse gap-2 cursor-not-allowed"
            }`}
            onClick={() => {
              if (step === 1) {
                setStep(2);
              }
            }}
            disabled={
              step === 1
                ? errors.phone ||
                  errors.sec_phone ||
                  !storeInfo.userInfo.name ||
                  !storeInfo.userInfo.email ||
                  !storeInfo.businessInfo.name ||
                  !storeInfo.businessInfo.type ||
                  !storeInfo.businessInfo.country ||
                  !storeInfo.businessInfo.state
                : errors.businessPhoneNumber ||
                  !storeInfo.businessInfo.instagram_user ||
                  !storeInfo.businessInfo.meta_id ||
                  !storeInfo.password ||
                  !storeInfo.confirmPassword ||
                  storeInfo.password !== storeInfo.confirmPassword
            }
          >
            <p className="right transition-all duration-300 ease-in">
              {step === 1 ? "التالي" : "اضافة"}
            </p>
            <span className="block scale-75">{loading && <Loader />}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddStore;
