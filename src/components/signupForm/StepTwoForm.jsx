import React from "react";
import { FileUploader } from "../fileUploader/FileUploader";
import Button_one from "../customButtons/Button_one";
import { Input } from "../ui/input";

function StepTwoForm({ signupInfo, setSignupInfo, step, loading }) {
  return (
    <>
      <div className="col-span-6 h-12 flex gap-2">
        <Input
          type="text"
          maxLength={11}
          placeholder="هاتف المشروع"
          value={signupInfo.businessInfo.businessPhoneNumber.firstPhoneNumber}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                businessPhoneNumber: {
                  ...signupInfo.businessInfo.businessPhoneNumber,
                  firstPhoneNumber: e.target.value,
                },
              },
            })
          }
          pattern="\d*"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, ""); // Removes non-digits
          }}
          className="h-full placeholder:h-6"
          required
        />
        <Input
          type="text"
          maxLength={11}
          placeholder="هاتف المشروع الثاني"
          pattern="\d*"
          value={signupInfo.businessInfo.businessPhoneNumber.secondPhoneNumber}
          onChange={(e) =>
            setSignupInfo({
              ...signupInfo,
              businessInfo: {
                ...signupInfo.businessInfo,
                businessPhoneNumber: {
                  ...signupInfo.businessInfo.businessPhoneNumber,
                  secondPhoneNumber: e.target.value,
                },
              },
            })
          }
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, ""); // Removes non-digits
          }}
          className="h-full placeholder:h-6"
        />
      </div>
      <Input
        value={signupInfo.businessInfo.instagramLink}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              instagramLink: e.target.value,
            },
          })
        }
        type="text"
        placeholder="رابط صفحة الانستغرام"
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <Input
        value={signupInfo.businessInfo.facebookLink}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              facebookLink: e.target.value,
            },
          })
        }
        type="text"
        placeholder="رابط صفحة الفيسبوك"
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <Input
        type="text"
        maxLength={13}
        placeholder="رقم الواتساب"
        value={signupInfo.businessInfo.whatsappNumber}
        onChange={(e) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              whatsappNumber: e.target.value,
            },
          })
        }
        pattern="\d*"
        inputMode="numeric"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/\D/g, ""); // Removes non-digits
        }}
        className="col-span-6 h-12 placeholder:h-6"
        required
      />
      <FileUploader
        className={"col-span-6 h-18"}
        onFileChange={(selectedFile) =>
          setSignupInfo({
            ...signupInfo,
            businessInfo: {
              ...signupInfo.businessInfo,
              businessLogo: selectedFile,
            },
          })
        }
      />
      <Button_one step={step} loading={loading} />
    </>
  );
}

export default StepTwoForm;
