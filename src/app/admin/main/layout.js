import Aside from "@/components/aside/Aside";
import Header from "@/components/header/Header";
import {
  CircleDollarSign,
  House,
  Store,
  TicketPlus,
  Users,
  UserSearch,
} from "lucide-react";

export default function RootLayout({ children }) {
  const menuList = [
    {
      group: "اكتشف",
      items: [
        {
          link: "/admin/main",
          name: "الرئيسية",
          icon: <House className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/admin/main/stores",
          name: "المتاجر",
          icon: <Store className="w-5 h-5" strokeWidth={1.5} />,
        },
      ],
    },
    {
      group: "المكتبة",
      items: [
        {
          link: "/admin/main/trainers",
          name: "المدربين",
          icon: <UserSearch className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/admin/main/employees",
          name: "الموظفين",
          icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/admin/main/payments",
          name: "المدفوعات",
          icon: <CircleDollarSign className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "/admin/main/subscriptions",
          name: "الاشتراكات",
          icon: <TicketPlus className="w-5 h-5" strokeWidth={1.5} />,
        },
      ],
    },
  ];
  const headerMenuList = [
    {
      link: "/admin/main",
      name: "الرئيسية",
      icon: <House className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      link: "/admin/main/stores",
      name: "المتاجر",
      icon: <Store className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      link: "/admin/main/trainers",
      name: "المدربين",
      icon: <UserSearch className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      link: "/admin/main/employees",
      name: "الموظفين",
      icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      link: "/admin/main/payments",
      name: "المدفوعات",
      icon: <CircleDollarSign className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      link: "/admin/main/subscriptions",
      name: "الاشتراكات",
      icon: <TicketPlus className="w-5 h-5" strokeWidth={1.5} />,
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
