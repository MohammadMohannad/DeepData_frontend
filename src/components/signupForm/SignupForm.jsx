"use client";
import React, { useState } from "react";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";
import Link from "next/link";
import { Button } from "../ui/button";
import Progress from "../signupProgressbar/Progress";
import axios from "axios";

function SignupForm() {

  const [errorMessage, setErrorMessage] = useState(null);  // For error messages
  const [successMessage, setSuccessMessage] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    userInfo: {
      email: "",
      password: "",
      name: "",
      phone: "",
      sec_phone: ""
    },
    businessInfo: {
      name: "",
      entity_phone: "",
      instagram_user: "",
      meta_id: "",
      logo: null,
      entity_type: "",
      country: "",
      state: ""
    },
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      if (step === 3) {
        await signup();  // Call signup function on the final step
      } else {
        setStep(step + 1);  // Move to the next step
        setLoading(false);
      }
    }
  };

  const signup = async () => {
    setLoading(true);  // Set loading state (if applicable)
    
    try {
      // Create FormData to handle both text data and file upload
      const formData = new FormData();
      
      // Append userInfo fields
      Object.keys(signupInfo.userInfo).forEach(key => {
        formData.append(`userInfo[${key}]`, signupInfo.userInfo[key]);
      });
  
      // Append businessInfo fields, including the logo if present
      Object.keys(signupInfo.businessInfo).forEach(key => {
        if (key === 'logo' && signupInfo.businessInfo.logo) {
          formData.append('businessInfo[logo]', signupInfo.businessInfo.logo);
        } else {
          formData.append(`businessInfo[${key}]`, signupInfo.businessInfo[key]);
        }
      });
  
      // Axios POST request
      const response = await axios.post('http://127.0.0.1:3002/api/v1/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart/form-data for file uploads
        },
      });
  
      // Successful response handling
      setSuccessMessage("Signup successful! You can now log in.");
      console.log("Signup successful", response.data);
      
    } catch (error) {
      // Error handling
      console.error("Error during signup:", error);
      setErrorMessage(error.response?.data?.error || "Signup failed. Please try again.");
      
    } finally {
      // Always executed
      setLoading(false);  // Reset loading state
    }
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
