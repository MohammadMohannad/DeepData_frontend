import Aside from "@/components/aside/Aside";
import Header from "@/components/header/Header";

export default function RootLayout({ children }) {
  return (
    <main className="flex flex-row-reverse items-start justify-center">
      <div className="hidden lg:flex min-w-[222px] min-h-screen">
        <Aside />
      </div>
      <div className="w-full h-full scrollbar-hide">
        <Header />
        <div className="px-2.5 sm:px-5 mt-6 right">{children}</div>
      </div>
    </main>
  );
}
