import React from "react";

function Modal({ open, setOpen, children, className, ...props }) {
  if (!open) return null;
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ${
        open ? "animate-fadeIn" : "animate-fadeOut pointer-events-none"
      }`}
      dir="ltr"
      {...props}
    >
      <div
        className={`${className} border bg-background rounded-xl p-6 transform transition-transform duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
