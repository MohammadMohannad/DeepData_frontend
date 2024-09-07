import React from "react";
import { Input } from "../ui/input";
import Button_one from "../customButtons/Button_one";

function StepOneForm({ signupInfo, setSignupInfo, step, loading }) {
  return (
    <>
      <Input
        value={signupInfo.userInfo.userName || ""}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            userInfo: { ...signupInfo.userInfo, userName: e.target.value },
          })
        }
        type="text"
        placeholder="الاسم الكامل"
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <div className="col-span-6 h-12 flex gap-2">
        <Input
          type="text"
          maxLength={11}
          placeholder="رقم الهاتف"
          value={signupInfo.userInfo.userPhoneNumber.firstPhoneNumber || ""}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              userInfo: {
                ...signupInfo.userInfo,
                userPhoneNumber: {
                  ...signupInfo.userPhoneNumber,
                  firstPhoneNumber: e.target.value,
                },
              },
            })
          }
          pattern="\d*"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          className="h-full placeholder:h-6"
          required
        />
        <Input
          type="text"
          maxLength={11}
          placeholder="رقم الهاتف الثاني"
          value={signupInfo.userInfo.userPhoneNumber.secondPhoneNumber}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              userInfo: {
                ...signupInfo.userInfo,
                userPhoneNumber: {
                  ...signupInfo.userPhoneNumber,
                  secondPhoneNumber: e.target.value,
                },
              },
            })
          }
          pattern="\d*"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          className="h-full placeholder:h-6"
        />
      </div>
      <Input
        type="email"
        value={signupInfo.userInfo.email}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            userInfo: { ...signupInfo.userInfo, email: e.target.value },
          })
        }
        placeholder="البريد الالكتروني"
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <div className="col-span-6 h-12 flex gap-2">
        <Input
          type="text"
          placeholder="البلد"
          value={signupInfo.userInfo.address.country}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              userInfo: {
                ...signupInfo.userInfo,
                address: {
                  ...signupInfo.userInfo.address,
                  country: e.target.value,
                },
              },
            })
          }
          className="h-full placeholder:h-6"
          required
        />
        <Input
          type="text"
          placeholder="المحافظة"
          value={signupInfo.userInfo.address.city}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              userInfo: {
                ...signupInfo.userInfo,
                address: {
                  ...signupInfo.userInfo.address,
                  city: e.target.value,
                },
              },
            })
          }
          className="h-full placeholder:h-6"
          required
        />
        <Input
          type="text"
          placeholder="المدينة"
          value={signupInfo.userInfo.address.subCity}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              userInfo: {
                ...signupInfo.userInfo,
                address: {
                  ...signupInfo.userInfo.address,
                  subCity: e.target.value,
                },
              },
            })
          }
          className="h-full placeholder:h-6"
          required
        />
      </div>
      <Input
        type={"text"}
        placeholder="اسم المشروع"
        value={signupInfo.businessInfo.businessName}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              businessName: e.target.value,
            },
          })
        }
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <Button_one step={step} loading={loading} />
    </>
  );
}

export default StepOneForm;
