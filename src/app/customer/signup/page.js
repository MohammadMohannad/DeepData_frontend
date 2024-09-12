"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SignupForm from "@/components/signupForm/SignupForm";
import img from "@/assets/img.svg";
import logo from "@/assets/logo.svg";

function Signup() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-white min-h-screen flex justify-start flex-col items-center md:justify-center">
      <h2 className="md:hidden mb-[72px] text-4xl mt-7 font-medium text-black">
        <span className="text-green_1">D</span>eep
        <span className="text-green_1">D</span>ata
      </h2>
      <div className="bg-white md:border rounded flex flex-col justify-items-start md:flex-row md:w-5/6 max-w-7xl">
        <div className="w-full md:w-1/2 flex flex-col items-center p-2 md:p-6">
          <div className="hidden md:flex flex-row-reverse w-full mb-14 items-end justify-start h-10">
            <Button
              variant="ghost"
              className={step === 1 ? "hidden" : "text-black text-base h-full"}
              onClick={() => setStep(step - 1)}
            >
              العودة
            </Button>
          </div>
          <div className="grid grid-cols-3 mb-6 h-2 min-w-[300px] rounded-[5px] overflow-hidden bg-gray-100">
            <div
              className={
                step === 1
                  ? "col-span-1 bg-black h-full transition-all ease-linear duration-300"
                  : "col-span-1 h-full transition-all ease-linear duration-300"
              }
            ></div>
            <div
              className={
                step === 2
                  ? "col-span-1 bg-black h-full transition-all ease-linear duration-300"
                  : "col-span-1 h-full transition-all ease-linear duration-300"
              }
            ></div>
            <div
              className={
                step === 3
                  ? "col-span-1 bg-black h-full transition-all ease-linear duration-300"
                  : "col-span-1 h-full transition-all ease-linear duration-300"
              }
            ></div>
          </div>
          <h2 className="font-bold text-2xl">انشاء حساب</h2>
          <div className="md:w-2/3 w-full">
            <p className="text-sm right text-center text-zinc-500 mb-4">
              مرحبا بك في DeepData
            </p>
            <SignupForm step={step} setStep={setStep} />
            <p
              className={
                step === 1
                  ? "text-[16px] text-right text-zinc-500 mt-6"
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
        <div className="hidden md:block right w-1/2 p-10 pt-6 bg-zinc-900 rounded-r">
          <div className="w-40 h-8 relative py-6">
            <Image src={logo} alt="logo" fill priority sizes="100vw" />
          </div>
          <div className="relative sm:m-auto sm:w-3/4 sm:aspect-[3/2]">
            <Image src={img} alt="login" sizes="100vw 100vh" priority fill />
          </div>
          <p className="text-white mt-4 text-right line-height md:text-[56px]">
            مرحبًا بك.
            <br /> ابدأ رحلتك
            <br />
            الآن مع نظام <br />
            الإدارة الخاص بنا!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
