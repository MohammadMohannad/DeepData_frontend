"use client";
import React from "react";
import Container from "../container/Container";
import avatar from "../../../public/Avatar.svg";
import { Bell, Sun } from "lucide-react";
import Image from "next/image";

function Header() {
  return (
    <header className="border-b h-16 p-5 right">
      <Container className={"h-full"}>
        <div className="flex flex-row-reverse justify-start items-center gap-2 h-full">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full border">
            <Image src={avatar} alt="avatar" sizes="13 13" fill priority />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">
            <Bell strokeWidth={1.5} className="w-3 h-3 text-gray-500" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">
            <Sun strokeWidth={1.5} className="w-3 h-3 text-gray-500" />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
