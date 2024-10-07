import Aside from "@/components/aside/Aside";
import Header from "@/components/header/Header";
import { Box, Folders, House, PhoneCall, Replace, Users } from "lucide-react";

export default function RootLayout({ children }) {
  const menuList = [
    {
      group: "اكتشف",
      items: [
        {
          link: "/customer/main",
          name: "الرئيسية",
          icon: <House className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/customer/main/products",
          name: "المنتجات",
          icon: <Box className="w-5 h-5" strokeWidth={1.5} />,
        },
      ],
    },
    {
      group: "المكتبة",
      items: [
        {
          link: "/customer/main/customers",
          name: "العملاء",
          icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/customer/main/orders",
          name: "طلبات العملاء",
          icon: <Folders className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/customer/main/employees",
          name: "الموظفين",
          icon: <Replace className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "#",
          name: "الدعم",
          icon: <PhoneCall className="w-5 h-5" strokeWidth={1.5} />,
        },
      ],
    },
  ];
  const headerMenuList = [
    {
      link: "/customer/main",
      name: "الرئيسية",
      icon: <House className="w-5 h-5" strokeWidth={1.25} />,
    },
    {
      link: "/customer/main/products",
      name: "المنتجات",
      icon: <Box className="w-5 h-5" strokeWidth={1.25} />,
    },
    {
      link: "/customer/main/customers",
      name: "العملاء",
      icon: <Users className="w-5 h-5" strokeWidth={1.25} />,
    },
    {
      link: "/customer/main/orders",
      name: "طلبات العملاء",
      icon: <Folders className="w-5 h-5" strokeWidth={1.25} />,
    },
    {
      link: "/customer/main/employees",
      name: "الموظفين",
      icon: <Replace className="w-5 h-5" strokeWidth={1.25} />,
    },
    {
      link: "#",
      name: "الدعم",
      icon: <PhoneCall className="w-5 h-5" strokeWidth={1.25} />,
    },
  ];
  return (
    <main className="flex flex-row-reverse items-start justify-center">
      <div className="hidden lg:flex min-w-[222px] min-h-screen">
        <Aside menuList={menuList} />
      </div>
      <div className="w-full h-full">
        <Header headerMenuList={headerMenuList} />
        <div className="px-2.5 sm:px-5 mt-6 right">{children}</div>
      </div>
    </main>
  );
}
