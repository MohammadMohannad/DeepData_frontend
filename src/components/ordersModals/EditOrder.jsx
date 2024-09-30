"use client";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../loader/Loader";
import { debounce } from "lodash";
import { Trash } from "lucide-react";

function EditOrder({ open, setOpen, order }) {
  const [newOrder, setNewOrder] = useState({
    id: "",
    name: "",
    products: [{}],
    price: "",
    phoneNumber: "",
    city: "",
    status: "",
    ...order,
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
    setNewOrder((prevState) => ({
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
      console.log(newOrder);
      setLoading(false);
      setOpen(false);
    }, 5000);
  };

  const handleProductChange = (e, index) => {
    const updatedProducts = newOrder.products.map((p, i) =>
      i === index ? { ...p, product: e.target.value } : p
    );
    setNewOrder((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
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
            اسم الزبون
          </label>
          <label
            htmlFor="city"
            className="w-full block text-right col-span-1 order-2 text-[12px]"
          >
            المحافظة
          </label>
          <Input
            value={newOrder.name || ""}
            onChange={(e) =>
              setNewOrder({
                ...newOrder,
                name: e.target.value,
              })
            }
            id="name"
            className="col-span-2 order-3"
            type="text"
            required
          />
          <Input
            value={newOrder.city || ""}
            onChange={(e) =>
              setNewOrder({
                ...newOrder,
                city: e.target.value,
              })
            }
            id="city"
            className="col-span-1 order-4"
            type="text"
            required
          />
        </div>
        <label
          htmlFor="phoneNumber"
          className="mb-1 w-full block text-right text-[12px]"
        >
          رقم الهاتف
        </label>
        <Input
          value={newOrder.phoneNumber || ""}
          onChange={(e) => handleChange(e, "phoneNumber")}
          className={`mb-4 w-full ${
            errors.phoneNumber && "ring-1 ring-red-500"
          }`}
          id="address"
          type="text"
          required
        />
        <div className="w-full mb-4 grid grid-cols-2 gap-2">
          {newOrder.products.map((product, i) => (
            <div
              key={i}
              className="w-full flex-col flex justify-between items-center"
            >
              <label
                htmlFor={"product" + product.id}
                className="w-full block mb-1 text-right text-[12px]"
              >
                {"المنتج " + (i + 1)}
              </label>
              <div className="w-full flex justify-between items-center focus:ring-1">
                <Input
                  value={product.product || ""}
                  onChange={(e) => handleProductChange(e, i)}
                  className="w-full border-l-0 rounded-l-none focus-visible:ring-transparent focus-visible:ring-[0px]"
                  id={"product" + product.id}
                  type="text"
                  required
                />

                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setNewOrder((prev) => ({
                      ...prev,
                      products: prev.products.filter(
                        (p) => p.id !== product.id
                      ),
                    }));
                  }}
                  className="h-full border border-r-0 rounded-r-none "
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            type="button"
            className="col-span-2"
            onClick={() => {
              setNewOrder((prev) => ({
                ...prev,
                products: [...prev.products, { id: prev.products.length + 1 }],
              }));
            }}
          >
            اضافة منتج
          </Button>
        </div>

        <label
          htmlFor="price"
          className="mb-1 w-full block text-right text-[12px]"
        >
          السعر الكلي
        </label>
        <Input
          value={newOrder.price || ""}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              price: e.target.value,
            })
          }
          className={"mb-4 w-full"}
          id="address"
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
              setNewOrder({});
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
              !newOrder.name ||
              !newOrder.city ||
              !newOrder.price ||
              !newOrder.products.length
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

export default EditOrder;
