import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

function Button_one({ step, loading, disabled, ...props }) {
  return (
    <Button
      type="submit" // This will trigger form submission and validation
      className={`relative h-12 col-span-6 bg-green_1 hover:bg-green_1 transition-colors duration-300 ${
        loading
          ? "opacity-50 flex gap-2 cursor-not-allowed transition-colors duration-300"
          : ""
      }`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader />}
      {loading ? "جاري إنشاء الحساب..." : step === 3 ? "انشاء حساب" : "التالي"}
    </Button>
  );
}

export default Button_one;
