import Image from "next/image";
import Link from "next/link";
import img from "@/assets/img.svg";
import logo from "@/assets/logo.svg";
import LoginForm from "@/components/loginForm/LoginForm";

function Login() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-background md:border rounded flex md:w-5/6 md:max-w-7xl w-full">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-2">
          <h2 className="md:hidden mb-16 text-3xl font-medium text-primary">
            <span className="text-green_1">D</span>eep
            <span className="text-green_1">D</span>ata
          </h2>
          <h2 className="font-bold text-xl">تسجيل الدخول</h2>
          <div className="w-full max-w-[328px] md:min-w-[320px] md:max-w-[350px]">
            <p className="text-sm text-center text-zinc-500 mb-4">
              يرجى إدخال بريدك الإلكتروني وكلمة المرور أدناه
              <br />
              لتسجيل الدخول إلى حسابك.
            </p>
            <LoginForm />
            <p className="text-[16px] text-right text-zinc-500 mt-6">
              ليس لديك حساب؟{" "}
              <Link href="/customer/signup" className="text-green_1">
                انشاء حساب
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block w-1/2 p-10 pt-6 bg-zinc-900 rounded-r right">
          <div className="w-40 h-8 relative py-6">
            <Image src={logo} alt="logo" fill priority sizes="100vw" />
          </div>
          <div className="sm:relative sm:m-auto sm:w-3/4 sm:aspect-[3/2]">
            <Image src={img} alt="login" sizes="100vw 100vh" priority fill />
          </div>
          <p className="text-white text-right mt-4 line-height md:text-[56px]">
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

export default Login;
