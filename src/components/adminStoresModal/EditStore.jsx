import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import { debounce } from "lodash";
import { Button } from "../ui/button";
import Loader from "../loader/Loader";
import { FileUploader } from "../fileUploader/FileUploader";

function EditStore({ open, setOpen, store }) {
  const [newStore, setNewStore] = useState({
    name: "",
    businessName: "",
    joinDate: "",
    endDate: "",
    state: "",
    city: "",
    email: "",
    country: "",
    phoneNumber: "",
    sec_phone: "",
    businessPhoneNumber: "",
    instagram_username: "",
    meta_id: "",
    plan: "",
    status: "",
    ...store,
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
    setNewStore((prevState) => ({
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
      alert("update store");
      console.log(newStore);
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
        <h2 className="text-base font-semibold">تعديل متجر</h2>
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
              value={newStore.name}
              onChange={(e) =>
                setNewStore({ ...newStore, name: e.target.value })
              }
              required
              id="name"
              className="mb-4"
            />
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <label
                htmlFor="number"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                رقم الهاتف
              </label>
              <label
                htmlFor="number2"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                رقم الهاتف الثاني
              </label>
              <Input
                value={newStore.phoneNumber || ""}
                onChange={(e) => handleChange(e, "phoneNumber")}
                className={`col-span-1 ${
                  errors.phoneNumber && "ring-1 ring-red-500"
                }`}
                id="number"
                type="text"
                required
              />
              <Input
                value={newStore.sec_phone || ""}
                onChange={(e) => handleChange(e, "sec_phone")}
                className={`col-span-1 ${
                  errors.sec_phone && "ring-1 ring-red-500"
                }`}
                id="number"
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
              value={newStore.email}
              onChange={(e) =>
                setNewStore({ ...newStore, email: e.target.value })
              }
              required
              id="email"
              className="mb-4"
            />
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <label
                htmlFor="country"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                البلد
              </label>
              <label
                htmlFor="state"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                المحافظة
              </label>
              <Input
                value={newStore.country || ""}
                onChange={(e) =>
                  setNewStore({ ...store, country: e.target.value })
                }
                className={"col-span-1"}
                id="country"
                type="text"
                required
              />
              <Input
                value={store.state || ""}
                onChange={(e) =>
                  setNewStore({ ...store, state: e.target.value })
                }
                className={"col-span-1"}
                id="state"
                type="text"
                required
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <label
                htmlFor="businessName"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                اسم المشروع
              </label>
              <label
                htmlFor="type"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                النوع
              </label>
              <Input
                value={store.businessName || ""}
                onChange={(e) =>
                  setNewStore({ ...store, businessName: e.target.value })
                }
                className={"col-span-1"}
                id="businessName"
                type="bname"
                required
              />
              <Input
                value={newStore.type || ""}
                onChange={(e) =>
                  setNewStore({ ...newStore, type: e.target.value })
                }
                className={"col-span-1"}
                id="type"
                type="text"
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <label htmlFor="bnumber" className="text-sm block mb-2 text-right">
              هاتف المشروع
            </label>
            <Input
              value={newStore.businessPhoneNumber || ""}
              onChange={(e) => handleChange(e, "businessPhoneNumber")}
              className={`mb-4 w-full ${
                errors.businessPhoneNumber && "ring-1 ring-red-500"
              }`}
              id="bnumber"
              type="text"
              required
            />
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <label
                htmlFor="face"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                رابط الفيسبوك
              </label>
              <label
                htmlFor="insta"
                className="mb-1 col-span-1 block text-right text-[12px]"
              >
                رابط الانستغرام
              </label>
              <Input
                value={newStore.meta_id || ""}
                onChange={(e) =>
                  setNewStore({ ...newStore, meta_id: e.target.value })
                }
                className={"col-span-1"}
                id="face"
                type="text"
                required
              />
              <Input
                value={newStore.instagram_user || ""}
                onChange={(e) =>
                  setNewStore({ ...newStore, instagram_user: e.target.value })
                }
                className={"col-span-1"}
                id="insta"
                type="text"
                required
              />
            </div>
            <label htmlFor="picture" className="text-sm block mb-2 text-right">
              ارفع شعار المتجر
            </label>
            <FileUploader
              onFileChange={(selectedFile) =>
                setNewStore({
                  ...store,
                  logo: selectedFile,
                })
              }
            />
            <label
              htmlFor="password"
              className="text-sm
            mt-6 block mb-2 text-right"
            >
              كلمة المرور
            </label>
            <Input
              type="password"
              id="password"
              required
              onChange={(e) =>
                setNewStore({ ...newStore, password: e.target.value })
              }
              value={newStore.password || ""}
              className={"mb-4 w-full"}
            />
            <label
              htmlFor="cpassword"
              className="text-sm block mb-2 text-right"
            >
              تأكيد كلمة المرور
            </label>
            <Input
              type="password"
              id="cpassword"
              required
              onChange={(e) =>
                setNewStore({ ...newStore, confirmPassword: e.target.value })
              }
              value={newStore.confirmPassword || ""}
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
              setNewStore({
                name: "",
                businessName: "",
                joinDate: "",
                endDate: "",
                state: "",
                city: "",
                email: "",
                country: "",
                phoneNumber: "",
                plan: "",
                status: "",
              });
              setOpen(false); // Close the modal
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
                ? errors.phoneNumber ||
                  errors.sec_phone ||
                  !newStore.name ||
                  !newStore.state ||
                  !newStore.country ||
                  !newStore.businessName ||
                  !newStore.type ||
                  !newStore.email
                : errors.businessPhoneNumber ||
                  !newStore.instagram_user ||
                  !newStore.meta_id ||
                  !newStore.logo ||
                  !newStore.password ||
                  !newStore.confirmPassword ||
                  newStore.password !== newStore.confirmPassword
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

export default EditStore;