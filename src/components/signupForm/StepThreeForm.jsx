import React from "react";
import { FileUploader } from "../fileUploader/FileUploader";
import Button_one from "../customButtons/Button_one";
import { Input } from "../ui/input";

function StepThreeForm({ signupInfo, setSignupInfo, step, loading }) {
  return (
    <>
      <Input
        type="password"
        placeholder="كلمة المرور"
        value={signupInfo.userInfo.passwords.password}
        onChange={(e) =>
          setSignupInfo((prev) => ({
            ...prev,
            userInfo: {
              ...prev.userInfo,
              passwords: {
                ...prev.userInfo.passwords,
                password: e.target.value,
              },
            },
          }))
        }
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <Input
        type="password"
        placeholder="تأكيد كلمة المرور"
        value={signupInfo.userInfo.passwords.confirmPassword}
        onChange={(e) =>
          setSignupInfo((prev) => ({
            ...prev,
            userInfo: {
              ...prev.userInfo,
              passwords: {
                ...prev.userInfo.passwords,
                confirmPassword: e.target.value,
              },
            },
          }))
        }
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <Button_one
        step={step}
        loading={loading}
        disabled={
          signupInfo.userInfo.passwords.password !==
          signupInfo.userInfo.passwords.confirmPassword
        }
      />
    </>
  );
}

export default StepThreeForm;
