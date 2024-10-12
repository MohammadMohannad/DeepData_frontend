import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import axios from "axios";

function StatusModal({ open, setOpen, store }) {
  const [storeStatus, setStoreStatus] = useState(store.status);
  const [arrowTracker, setArrowTracker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    setLoading(true);
    
    try {
      const response = await axios.patch(`http://localhost:3002/api/v1/entities/${store.id}`, {
        status: storeStatus,
      },{
        withCredentials: true
      });
      
      console.log("Response:", response.data);
      alert("تم تغيير حالة المتجر الى : " + storeStatus);
      setOpen(false); // Close the modal
    } catch (error) {
      console.error("Error changing store status:", error);
      alert("فشل في تغيير حالة المتجر");
    } finally {
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
        <h2 className="text-base font-semibold">تغير حالة المتجر</h2>
        <p className="text-sm text-muted-foreground">حدد الحالة المرادة </p>
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
                {storeStatus === "active"
                  ? "فعال"
                  : storeStatus === "inactive"
                  ? "غير فعال"
                  : storeStatus === "pending"
                  ? "قيد الانتظار"
                  : ""}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] right">
            <DropdownMenuRadioGroup
              value={storeStatus}
              onValueChange={setStoreStatus}
            >
              <DropdownMenuRadioItem value="active" className="text-green-500">
                فعال
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="inactive" className="text-red-500">
                غير فعال
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pending" className="text-[#ffe08c]">
                قيد الانتظار
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
            setStoreStatus(store.status); // Reset to original status
            setOpen(false);
          }}
        >
          الغاء
        </Button>
        <Button
          onClick={handleStatusChange}
          className="w-[60px] h-[35px] text-sm"
          disabled={loading}
        >
          {loading ? "جارٍ التحديث..." : "تأكيد"}
        </Button>
      </div>
    </Modal>
  );
}

export default StatusModal;
