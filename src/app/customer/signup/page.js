import Image from "next/image";
import React from "react";
import SignupForm from "@/components/signupForm/SignupForm";
import img from "@/assets/img.svg";
import logo from "@/assets/logo.svg";

function Signup() {
  return (
    <div className="bg-background min-h-screen flex justify-start flex-col items-center md:justify-center">
      <h2 className="md:hidden mb-[72px] text-4xl mt-7 font-medium text-primary">
        <span className="text-green_1">D</span>eep
        <span className="text-green_1">D</span>ata
      </h2>
      <div className="bg-background md:border rounded flex flex-col justify-items-start md:flex-row md:w-5/6 max-w-7xl">
        <div className="w-full md:w-1/2 flex flex-col items-center p-2 md:p-6">
          <SignupForm />
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
