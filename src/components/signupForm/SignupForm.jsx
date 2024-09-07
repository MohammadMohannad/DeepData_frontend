"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Button_one from "../customButtons/Button_one";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";

function SignupForm({ step, setStep }) {
  const [loading, setLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    userInfo: {
      email: "",
      passwords: {
        password: "",
        confirmPassword: "",
      },
      userName: "",
      userPhoneNumber: {
        firstPhoneNumber: "",
        secondPhoneNumber: "",
      },
      address: {
        country: "",
        city: "",
        subCity: "",
      },
    },
    businessInfo: {
      businessName: "",
      businessPhoneNumber: {
        firstPhoneNumber: "",
        secondPhoneNumber: "",
      },
      instagramLink: "",
      facebookLink: "",
      whatsappNumber: "",
      businessLogo: null,
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
    // Implement signup logic here
    setTimeout(() => {
      alert("signup");
      setLoading(false);
      console.log(signupInfo);
    }, 5000);
  };

  return (
    <>
      <form
        className="grid grid-cols-6 items-center w-full gap-2"
        onSubmit={handleSubmit} // Handle form submit
      >
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
    </>
  );
}

export default SignupForm;
