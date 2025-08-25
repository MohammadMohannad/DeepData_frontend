"use client";
import { ChevronLeft, X, Clipboard, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChatModal({ open, setOpen }) {
  const [message, setMessage] = useState({
    message: "",
    uploadedImage: null,
  });
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }, [message.message]);

  const handleImageUpload = (blob) => {
    setMessage((m) => ({ ...m, uploadedImage: blob }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      handleImageUpload(file);
      toast.success("تم اختيار الصورة");
    }
  };

  const handlePasteClick = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find((t) => t.startsWith("image/"));
        if (type) {
          const blob = await item.getType(type);
          handleImageUpload(blob);
          toast.success("تم لصق الصورة من الحافظة");
          return;
        }
      }
      const text = await navigator.clipboard.readText();
      setMessage((m) => ({ ...m, message: m.message + text }));
      toast.success("تم لصق النص من الحافظة");
    } catch (err) {
      console.error("Clipboard read failed", err);
      toast.error("لا يمكن الوصول إلى الحافظة");
    }
  };

  const sendMessage = async () => {
    if (!message.message.trim() && !message.uploadedImage) return;

    const newMsg = {
      message: message.message,
      time: new Date().toLocaleTimeString(),
      image: message.uploadedImage,
    };
    setMessages((prev) => [...prev, newMsg]);

    try {
      const formData = new FormData();
      // Always include message field
      formData.append("message", message.message);
      // Use 'image' field name to match backend
      if (message.uploadedImage) {
        formData.append(
          "image",
          message.uploadedImage,
          message.uploadedImage.name || "image.png"
        );
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/send_message`,
        formData,
        { withCredentials: true }
      );
      toast.success("تم ارسال الرسالة وحفظ البيانات بنجاح");
    } catch (err) {
      console.error(err.response?.data || err.message);
      const serverMsg = err.response?.data?.error || "حدث خطأ أثناء الإرسال";
      toast.error(serverMsg);
    }

    setMessage({ message: "", uploadedImage: null });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const togglePopover = () => {
    setOpen((o) => !o);
    setMessage({ message: "", uploadedImage: null });
  };

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 w-full backdrop-blur-sm bg-black bg-opacity-50 sm:bg-opacity-0 sm:backdrop-blur-none h-full z-50" dir="ltr">
          <div className="w-full h-full relative sm:block flex items-center justify-center">
            <div className="max-w-[400px] flex flex-col justify-between min-w-[96%] sm:min-w-[400px] h-[calc(100vh-200px)] sm:h-fit sm:max-h-[680px] bg-background border sm:border rounded-[6px] sm:absolute sm:left-[38px] sm:bottom-8 lg:bottom-20">

              {/* Header (large screens) */}
              <div className="hidden sm:block w-full h-2/5 gradient relative overflow-hidden rounded-t-[6px]">
                <div className="w-full h-full relative overflow-hidden before:absolute before:inset-0 before:backdrop-blur-2xl before:z-0 p-[20px]">
                  <div className="w-full flex flex-col justify-between h-full relative z-10">
                    <div className="h-3/5 flex mb-4 items-start justify-between flex-row-reverse">
                      <div className="aspect-square h-[55px] bg-white rounded-full flex items-center justify-center text-[26px] font-semibold text-[#1AB68A]">
                        D
                      </div>
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
                        يرجى التأكد من ان ادخال البيانات صحيحة
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Header (small screens) */}
              <div className="w-full flex flex-row sm:hidden">
                <div
                  className="w-[30px] h-[30px] bg-gray-100 mt-2 ml-[20px] text-right rounded-full flex items-center justify-center cursor-pointer"
                  onClick={togglePopover}
                >
                  <X strokeWidth={1.5} size={20} className="text-black" />
                </div>
              </div>

              {/* Messages */}
              <div className="w-full h-fit sm:max-h-[250px] min-h-[250px] px-[20px] pt-4 overflow-y-scroll" dir="rtl">
                <div className="w-[80%] h-fit mb-8" dir="rtl">
                  <div className="w-full bg-green_1 rounded-l-[6px] rounded-br-[6px] text-[13px] px-2.5 py-1.5 text-white">
                    مرحبا بك مرة اخرى
                  </div>
                  <div
                    dir="rtl"
                    className="text-start text-[10px] text-[#98A2B3]"
                  >
                    Now
                  </div>
                </div>
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
                    {msg.image && (
                      <img
                        src={URL.createObjectURL(msg.image)}
                        alt="pasted"
                        className="mt-2 max-h-[100px] rounded"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Input area */}
  <div className="px-[20px] py-[11px] w-full border-t rounded-b-[6px] flex gap-1 flex-row-reverse items-center">
                <div className="relative flex-1">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={message.message}
                    onChange={(e) => setMessage((m) => ({ ...m, message: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب الطلب"
                    className="w-full resize-none border-none p-0 focus:outline-none break-all whitespace-pre-wrap overflow-hidden"
                    dir="rtl"
                  />
                  {message.uploadedImage && (
                    <img
                      src={URL.createObjectURL(message.uploadedImage)}
                      alt="preview"
                      className="absolute bottom-full mb-2 max-h-[80px] rounded"
                    />
                  )}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                <div onClick={() => fileInputRef.current?.click()} className="w-[35px] h-[35px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer" title="Upload image">
                  <Upload size={20} />
                </div>
                <div onClick={handlePasteClick} className="w-[35px] h-[35px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer" title="Paste from clipboard">
                  <Clipboard size={20} />
                </div>
                <div onClick={sendMessage} className="w-[35px] h-[35px] rounded-full bg-green_1 flex items-center justify-center cursor-pointer">
                  <ChevronLeft className="text-white" size={20} />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
