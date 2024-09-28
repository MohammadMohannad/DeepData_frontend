import React from "react";
import Button_one from "../customButtons/Button_one";
import { Input } from "../ui/input";

function StepThreeForm({ signupInfo, setSignupInfo, step, loading }) {
  return (
    <>
      <Input
        type="password"
        placeholder="كلمة المرور"
        value={signupInfo.userInfo.password}
        onChange={(e) =>
          setSignupInfo((prev) => ({
            ...prev,
            userInfo: {
              ...prev.userInfo,
              password: e.target.value,
            },
          }))
        }
        className="col-span-6 h-12 placeholder:h-6 placeholder:text-right"
        required
      />
      <Input
        type="password"
        placeholder="تأكيد كلمة المرور"
        value={signupInfo.confirmPassword || ""} // Store confirmPassword outside userInfo
        onChange={(e) =>
          setSignupInfo((prev) => ({
            ...prev,
            confirmPassword: e.target.value, // Store confirmPassword separately
          }))
        }
        className="col-span-6 h-12 placeholder:h-6 placeholder:text-right"
        required
      />
      <Button_one
        step={step}
        loading={loading}
        disabled={
          signupInfo.userInfo.password !==
            signupInfo.confirmPassword ||
          !signupInfo.userInfo.password ||
          !signupInfo.confirmPassword
        }
      />
    </>
  );
}

export default StepThreeForm;
