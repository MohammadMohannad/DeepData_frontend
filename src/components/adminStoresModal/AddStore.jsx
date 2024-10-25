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
      phone: "",
      instagram_user: "",
      meta_id: "",
      country: "",
      state: "",
      entity_type: "",
    },
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: null,
    sec_phone: null,
    entity_phone: null,
  });

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(07|9647)\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

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

  const handleChange = (e, field, section) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setStoreInfo((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: numericValue,
      },
    }));
    handlePhoneNumberChange(numericValue, field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    if (step === 2) {
      try {
        const formData = new FormData();
        Object.keys(storeInfo.userInfo).forEach((key) => {
          formData.append(`userInfo[${key}]`, storeInfo.userInfo[key]);
        });

        Object.keys(storeInfo.businessInfo).forEach((key) => {
            formData.append(`businessInfo[${key}]`, storeInfo.businessInfo[key]);
        });

        formData.append("confirmPassword", storeInfo.confirmPassword);

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

        // router.push("/login");
        setSuccessMessage("Signup successful! You can now log in.");
      } catch (error) {
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

  const isStep1Valid = () => {
    const { name, email, phone, sec_phone } = storeInfo.userInfo;
    const { country, state } = storeInfo.businessInfo;
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      sec_phone.trim() !== "" &&
      country.trim() !== "" &&
      state.trim() !== "" &&
      !errors.phone &&
      !errors.sec_phone
    );
  };

  const isStep2Valid = () => {
    const {  confirmPassword } = storeInfo;
    const { name, instagram_user, meta_id, entity_phone } = storeInfo.businessInfo;
    const { password } = storeInfo.userInfo;
    return (
      name.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      instagram_user.trim() !== "" &&
      meta_id.trim() !== "" &&
      entity_phone.trim() !== "" &&
      !errors.entity_phone
    );
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
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
            <label htmlFor="country" className="mb-1 col-span-1 block text-right text-[12px]">
                البلد
              </label>
              <label htmlFor="state" className="mb-1 col-span-1 block text-right text-[12px]">
                المحافظة
              </label>
              <Input
                type="text"
                id="country"
                value={storeInfo.businessInfo.country}
                onChange={(e) =>
                  setStoreInfo({
                    ...storeInfo,
                    businessInfo: {
                      ...storeInfo.businessInfo,
                      country: e.target.value,
                    },
                  })
                }
                className={`col-span-1 ${errors.sec_phone && "ring-1 ring-red-500"}`}
                required
              />

              <Input
                type="text"
                id="state"
                value={storeInfo.businessInfo.state}
                onChange={(e) =>
                  setStoreInfo({
                    ...storeInfo,
                    businessInfo: {
                      ...storeInfo.businessInfo,
                      state: e.target.value,
                    },
                  })
                }
                className={`col-span-1 ${errors.sec_phone && "ring-1 ring-red-500"}`}
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
            <label htmlFor="bname" className="text-sm block mb-2 text-right">
                اسم المشروع
              </label>
              <label htmlFor="bnumber" className="text-sm block mb-2 text-right">
                هاتف المشروع
              </label>
              <Input
                value={storeInfo.businessInfo.name || ""}
                onChange={(e) =>
                  setStoreInfo((prev) => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, name: e.target.value },
                  }))
                }
                className={`mb-4 w-full ${errors.name && "ring-1 ring-red-500"}`}
                id="bname"
                type="text"
                required
              />
              <Input
                value={storeInfo.businessInfo.entity_phone || ""}
                onChange={(e) => handleChange(e, "entity_phone", "businessInfo")}
                className={`mb-4 w-full ${errors.entity_phone && "ring-1 ring-red-500"}`}
                id="bnumber"
                type="text"
                required
              />
            </div>
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
              value={storeInfo.userInfo.password || ""}
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
                  password: "",
                },
                businessInfo: {
                  name: "",
                  entity_phone: "",
                  instagram_user: "",
                  meta_id: "",
                  country: "",
                  state: "",
                  type: "",
                },
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
            className={`h-full w-20 transition-all duration-300 ease-in ${loading &&
              "opacity-50 w-32 flex flex-row-reverse gap-2 cursor-not-allowed"}`}
            onClick={() => {
              if (step === 1 && isStep1Valid()) {
                setStep(2);
              }
            }}
            disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
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
