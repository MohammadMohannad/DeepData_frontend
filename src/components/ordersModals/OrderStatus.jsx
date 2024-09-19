import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function OrderStatus({ open, setOpen, order }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [arrowTracker, setArrowTracker] = useState(false);

  const handleStatusChange = () => {
    console.log(orderStatus);
    setArrowTracker(false);
    setOpen(false);
    alert("تم تغيير حالة الطلب الى : " + orderStatus);
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
        <h2 className="text-base font-semibold">تغير حالة الطلب</h2>
        <p className="text-sm text-muted-foreground">
          يرجى التأكد قبل تغيير حالة الطلب
        </p>
      </div>
      <div className="w-full mb-10 mt-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center"
              onClick={() => setArrowTracker(!arrowTracker)}
            >
              <ChevronDown
                className={`text-muted-foreground transition-transform duration-300 ${
                  arrowTracker ? "rotate-180" : "rotate-0"
                }`}
                strokeWidth={1.5}
              />
              <div>
                {orderStatus === "الطلب مكتمل"
                  ? "الطلب مكتمل"
                  : orderStatus === "ملغى"
                  ? "الطلب ملغى"
                  : ""}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] right">
            <DropdownMenuRadioGroup
              value={orderStatus}
              onValueChange={setOrderStatus}
            >
              <DropdownMenuRadioItem
                value="الطلب مكتمل"
                className="text-green-500"
              >
                الطلب مكتمل
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ملغى" className="text-red-500">
                الطلب ملغى
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex gap-2 items-center justify-between">
        <Button
          className="w-[60px] h-[35px] text-base"
          variant="ghost"
          onClick={() => {
            setOrderStatus(null);
            setOpen(false);
          }}
        >
          الغاء
        </Button>
        <Button onClick={handleStatusChange} className="w-[60px] h-[35px] text-sm">
          تأكيد
        </Button>
      </div>
    </Modal>
  );
}

export default OrderStatus;
