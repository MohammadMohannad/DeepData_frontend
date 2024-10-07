"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, CommandItem, CommandList } from "../ui/command";
import { House, Box, Users, Folders, Replace, PhoneCall } from "lucide-react";

function Aside({ menuList }) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <aside className="border-l fixed text-right flex flex-col min-h-screen p-4 lg:w-auto lg:min-w-[222px] gap-6">
      <div className="py-3 pb-4">
        <h2 className="text-[34px] font-medium text-primary">
          <span className="text-green-600 font-bold">D</span>eep
          <span className="text-green-600 font-bold">D</span>ata
        </h2>
      </div>
      <Command>
        <CommandList>
          <div className="flex flex-col gap-4 grow">
            {menuList.map((menu, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold px-4 mb-2">
                  {menu.group}
                </h3>
                {menu.items.map((item, i) => {
                  const isActive = pathname === item.link;
                  return (
                    <Link href={item.link} key={i} passHref>
                      <CommandItem
                        className={`flex min-w-[188px] flex-row-reverse gap-2 px-4 py-2 cursor-pointer 
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
