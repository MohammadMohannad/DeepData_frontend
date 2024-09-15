"use client";
import { ChevronLeft, X } from "lucide-react";
import { Input } from "../ui/input";
import ChatImageUploader from "../fileUploader/ChatImageUploader";
import { useState, useEffect } from "react";

export default function ChatModal({ open, setOpen }) {
  const [message, setMessage] = useState({
    message: "",
    uploadedImage: null,
  });

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

  const handleImageUpload = (image) => {
    setMessage({ ...message, uploadedImage: image });
  };

  const sendMessage = () => {
    console.log(message);
    setMessage({ message: "", uploadedImage: null });
  };

  const togglePopover = () => {
    setOpen(!open);
    setMessage({ message: "", uploadedImage: null });
  };

  const messages = [
    {
      id: 1,
      message: "مرحبا بكم في ديب ديتا",
      time: "10:30 AM",
    },
    {
      id: 2,
      message:
        "لوريملوريم ايبسوملوريم ايبسوم لوريم ايبسوم ايبسوم لوريملوريم ايبسوم لوريم ايبسوم لوريم ايبسوم  ايبسوم لوريم ايبسوم ",
      time: "10:35 AM",
    },
    {
      id: 3,
      message:
        "لوريملوريم ايبسوملوريم ايبسوم لوريم ايبسوم ايبسوم لوريملوريم ايبسوم لوريم ايبسوم لوريم ايبسوم  ايبسوم لوريم ايبسوم ",

      time: "10:40 AM",
    },
  ];

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full z-50" dir="ltr">
          <div className="w-full h-full relative sm:block flex items-center justify-center">
            <div className="max-w-[450px]  max-h-[580px] bg-background border-[3px] sm:border rounded-[6px] sm:absolute sm:left-[38px] sm:bottom-8 lg:bottom-20">
              <div className="hidden sm:block w-full h-2/5 gradient relative overflow-hidden rounded-t-[6px]">
                <div className="w-full h-full relative overflow-hidden before:absolute before:inset-0 before:backdrop-blur-2xl before:z-0 p-[20px]">
                  <div className="w-full flex flex-col justify-between h-full relative z-10">
                    <div className="h-3/5 flex mb-4 items-start justify-between flex-row-reverse">
                      <div className="aspect-square h-[55px] bg-white rounded-full flex items-center justify-center text-[26px] font-semibold text-[#1AB68A]">
                        D
                      </div>
                      {/* Close button */}
                      <div
                        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer"
                        onClick={togglePopover}
                      >
                        <X strokeWidth={1.5} size={20} className="text-black" />
                      </div>
                    </div>
                    <div className="text-right text-white">
                      <h1 className="text-2xl font-bold">مرحبا بك مرة اخرى</h1>
                      <p className="text-sm mt-1">
                        هل لديك اليوم طلبات جديدة؟
                        <br />
                        يرجى التأكد من ان ادخال البيانات صحيحة{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row sm:hidden">
                <div
                  className="w-[30px] h-[30px] bg-gray-100 mt-2 ml-[20px] text-right rounded-full flex items-center justify-center cursor-pointer"
                  onClick={togglePopover}
                >
                  <X strokeWidth={1.5} size={20} className="text-black" />
                </div>
              </div>

              {/* old messages */}
              <div className="w-full h-3/5  border-b right px-[20px] pt-4 overflow-y-scroll">
                {messages.map((msg, index) => (
                  <div className="w-[80%] h-fit mb-8" key={index}>
                    <div className="w-full bg-green_1 rounded-l-[6px] rounded-br-[6px] text-[13px] px-2.5 py-1.5 text-white">
                      {msg.message}
                    </div>
                    <div
                      dir="ltr"
                      className="text-center text-[10px] text-[#98A2B3]"
                    >
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-[20px] w-full h-[12%]  overflow-hidden rounded-b-[6px] flex gap-1 flex-row-reverse items-center">
                {/* handle the message input here */}
                <Input
                  type="text"
                  value={message.message}
                  onChange={(e) =>
                    setMessage({ ...message, message: e.target.value })
                  }
                  placeholder="اكتب الطلب"
                  className="max-w-3/4 right border-none p-0  focus-visible:ring-transparent"
                />
                <div className="flex items-center justify-between flex-row-reverse gap-[10px]">
                  {/* Image upload */}
                  <ChatImageUploader onImageUpload={handleImageUpload} />
                  <div
                    onClick={() => message.message && sendMessage()}
                    className="w-[35px] h-[35px] rounded-full bg-green_1 flex items-center justify-center"
                  >
                    <ChevronLeft className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
