"use client";
import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, CommandItem, CommandList } from "../ui/command";
import { House, Box, Users, Folders, Replace, PhoneCall } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

function Aside() {
  const pathname = usePathname(); // Get the current pathname

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
          link: "#",
          name: "العملاء",
          icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "#",
          name: "طلبات العملاء",
          icon: <Folders className="w-5 h-5" strokeWidth={1.5} />,
        },
        {
          link: "#",
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

  return (
    <aside className="flex text-right flex-col min-h-screen p-3 py-4 w-full gap-4">
      <div className="py-3 pb-4">
        <h2 className={`${poppins.className} text-3xl font-semibold`}>
          <span className="text-green_1 font-bold">D</span>eep
          <span className="text-green_1 font-bold">D</span>ata
        </h2>
      </div>
      <Command>
        <CommandList>
          <div className="flex flex-col gap-4 ">
            {menuList.map((menu, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold px-4 mb-2">
                  {menu.group}
                </h3>
                {menu.items.map((item, i) => {
                  // Check if the item is active
                  const isActive = pathname === item.link;
                  return (
                    <Link href={item.link} key={i} passHref>
                      <CommandItem
                        className={`flex flex-row-reverse gap-2 px-4 py-2 cursor-pointer  ${
                          isActive
                            ? "bg-gray-100"
                            : "text-black hover:bg-gray-50"
                        }`}
                      >
                        <div>{item.icon}</div>
                        <div>{item.name}</div>
                      </CommandItem>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </CommandList>
      </Command>
    </aside>
  );
}

export default Aside;
