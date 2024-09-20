"use client";
import React from "react";
import Container from "../container/Container";
import avatar from "@/assets/Avatar.svg";
import {
  AlignRight,
  Bell,
  Box,
  Folders,
  House,
  PhoneCall,
  Replace,
  Sun,
  Users,
} from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet";
import { Command, CommandItem, CommandList } from "../ui/command";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import logout from "@/assets/logout-icon.svg";
import ToggleTheme from "../theme/ToggleTheme";
import { AvatarPopover } from "../avatarPopover/AvatarPopover";

function Header() {
  const pathname = usePathname(); // Get the current pathname

  const menuList = [
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
    <header className="border-b h-16 px-2.5 sm:p-5 right">
      <Container
        className={"h-full flex items-center justify-between flex-row-reverse"}
      >
        <div className="flex flex-row-reverse justify-start items-center gap-2 h-full">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full border">
            <AvatarPopover />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">
            <Bell
              className="w-[16px] h-[16px] text-[#98A2B3]"
              strokeWidth={1.5}
            />
          </div>
          <ToggleTheme />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            {/* Wrap the icon inside a div to ensure only one child */}
            <div className="lg:hidden">
              <AlignRight strokeWidth={1.5} className="w-6 h-6 text-primary" />
            </div>
          </SheetTrigger>
          <SheetContent className="p-[15px] ">
            <SheetClose asChild>
              <div className="mt-[71px] flex gap-2 items-center justify-start flex-row-reverse">
                <div className="w-[40px] h-[40px] relative rounded-full">
                  <Image src={avatar} alt="avatar" sizes="40" fill priority />
                </div>
                <p className="text-[17px] font-semibold">{"متجر السعادة"}</p>
              </div>
            </SheetClose>
            <div className="h-[74vh] w-full flex flex-col justify-between">
              <Command className="flex items-end h-[300px]">
                <CommandList className="w-full pl-5 gap-1 mt-8">
                  {menuList.map((item, i) => {
                    const isActive = pathname === item.link;
                    return (
                      <SheetClose asChild key={i}>
                        <Link
                          href={item.link}
                          passHref
                          className="text-right w-full"
                        >
                          <CommandItem
                            className={`flex flex-row-reverse gap-2 px-4 py-2 cursor-pointer 
                  ${
                    isActive
                      ? "bg-secondary"
                      : "text-primary hover:bg-primary-foreground"
                  }`}
                          >
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                          </CommandItem>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </CommandList>
              </Command>
              <SheetFooter>
                <Button
                  onClick={() => {
                    window.location.href = "/customer/login";
                  }}
                  variant="destructive"
                  className="w-full flex flex-row-reverse gap-4 px-4 py-2 h-[45px] bg-[#FFE5E7] text-[#FF5757] rounded-[8px] cursor-pointer focus-visible:ring-transparent"
                >
                  <div className="aspect-square w-[25px] relative">
                    <Image src={logout} alt="logout" fill priority sizes="25" />
                  </div>
                  <div className="text-[15px] font-medium">تسجيل الخروج</div>
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}

export default Header;
