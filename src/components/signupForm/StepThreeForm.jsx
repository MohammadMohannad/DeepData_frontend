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
        value={signupInfo.userInfo.confirmPassword}
        onChange={(e) =>
          setSignupInfo((prev) => ({
            ...prev,
            userInfo: {
              ...prev.userInfo,
              confirmPassword: e.target.value,
            },
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
            signupInfo.userInfo.confirmPassword ||
          !signupInfo.userInfo.password ||
          !signupInfo.userInfo.confirmPassword
        }
      />
    </>
  );
}

export default StepThreeForm;
