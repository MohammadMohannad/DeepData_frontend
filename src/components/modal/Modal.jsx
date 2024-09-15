import React from "react";

function Modal({ open, setOpen, children, className, ...props }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
      dir="ltr"
      {...props}
    >
      {/* Modal content */}
      <div className={`${className} p-6`}>{children}</div>
    </div>
  );
}

export default Modal;
