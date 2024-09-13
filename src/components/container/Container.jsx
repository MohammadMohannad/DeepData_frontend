import React from "react";

export default function Container({ children, className, ...props }) {
  return (
    <div className={`max-w-[1136px] ${className||''}`} {...props}>
      {children}
    </div>
  );
}
