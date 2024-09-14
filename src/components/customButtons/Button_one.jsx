"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

function ButtonOne({ step = 0, loading, page = "signup", disabled, ...props }) {
  // Define the button text based on conditions
  const getButtonText = () => {
    if (loading && page === "signup") return "جاري انشاء حساب...";
    if (step === 3) return "انشاء حساب";
    if (step >= 1) return "التالي";
    if (page === "login" && loading) return "جاري تسجيل الدخول...";
    if (page === "login" && !loading) return "تسجيل الدخول";
    return null;
  };

  // Combine dynamic classes
  const buttonClasses = `
    relative h-12 col-span-6 text-white bg-green_1 hover:bg-green_1 transition-colors duration-300 
    ${
      loading ? "opacity-50 flex flex-row-reverse gap-2 cursor-not-allowed" : ""
    }
    ${page === "login" ? "w-full" : ""}
  `;

  return (
    <Button
      type="submit"
      disabled={loading || disabled}
      className={buttonClasses.trim()} // Remove any extra spaces from the class string
      {...props}
    >
      {loading && <Loader />}
      <span className="right">{getButtonText()}</span>
    </Button>
  );
}

export default ButtonOne;
