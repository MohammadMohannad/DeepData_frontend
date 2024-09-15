"use client";
import React, { useState } from "react";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";
import Link from "next/link";
import { Button } from "../ui/button";
import Progress from "../signupProgressbar/Progress";

function SignupForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    userInfo: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      firstPhoneNumber: "",
      secondPhoneNumber: "",
    },
    businessInfo: {
      businessName: "",
      phoneNumber: "",
      instagramLink: "",
      meta_id: "",
      businessLogo: null,
      type: "",
      country: "",
      state: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      if (step === 3) {
        await signup();
      } else {
        setStep(step + 1);
        setLoading(false);
      }
    }
  };

  const signup = async () => {
    // Implement signup logic here instead of setTimeout don't forget to setLoading(false) in the end
    setTimeout(() => {
      alert("signup");
      setLoading(false);
      console.log(signupInfo);
    }, 5000);
  };

  return (
    <>
      {/* header */}
      <div className="hidden md:flex flex-row-reverse w-full mb-14 items-end justify-start h-10">
        <Button
          variant="ghost"
          className={step === 1 ? "hidden" : "text-primary text-base h-full"}
          onClick={() => setStep(step - 1)}
        >
          العودة
        </Button>
      </div>
      <Progress step={step} />
      <div className="md:w-2/3 w-full">
        {/* form */}
        <form
          className="grid grid-cols-6 items-center w-full gap-2"
          onSubmit={handleSubmit} // Handle form submit
        >
          <div className="col-span-6">
            <h2 className="font-bold text-2xl text-center">انشاء حساب</h2>
            <p className="text-sm right text-center text-zinc-500 mb-4">
              مرحبا بك في DeepData
            </p>
          </div>
          {step === 1 && (
            <StepOneForm
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              step={step}
              loading={loading}
            />
          )}
          {step === 2 && (
            <StepTwoForm
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              step={step}
              loading={loading}
            />
          )}
          {step === 3 && (
            <StepThreeForm
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              step={step}
              loading={loading}
            />
          )}
        </form>
        {/* footer */}
        <div className="col-span-6">
          <p
            className={
              step === 1
                ? "text-[16px] text-right w-full text-zinc-500 mt-6"
                : "hidden"
            }
          >
            لديك حساب بالفعل ؟{" "}
            <Link href="/customer/login" className="text-green_1">
              تسجيل دخول
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
