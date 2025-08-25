// components/AvatarPopover.jsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { Dot } from "lucide-react";
import logoutIcon from "@/assets/logout-icon.svg";
import avatarPlaceholder from "@/assets/Avatar.svg";
import { handleLogout } from "../logout";

export function AvatarPopover({ img }) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_data`,
        { withCredentials: true }
      );
      setUserData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        // redirect to login on unauthorized
        router.push("/login");
        return;
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error.message || "Something went wrong"}</div>;

  // If not authenticated (401 happened), userData remains null and we've redirected.
  if (!userData) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full h-full rounded-full">
          <Image
            src={img || avatarPlaceholder}
            alt="avatar"
            fill
            priority
            className="rounded-full"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-44 p-2" align="start">
        <div className="flex flex-col items-center p-2 mb-4 border rounded-md h-24 overflow-hidden">
          <div className="relative w-10 h-10 mb-1">
            <Image
              src={img || avatarPlaceholder}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <Dot size={70} className="absolute bottom-[-30px] text-green-400" />
          </div>
          <div className="text-center">
            <p className="text-sm">{userData.name}</p>
            <p className="text-[9px] text-muted-foreground">{userData.email}</p>
          </div>
        </div>

        <Link
          href="#"
          onClick={async (e) => {
            e.preventDefault();
            await handleLogout(router);
          }}
          className="flex items-center justify-center gap-2 w-full p-2 bg-red-100 text-red-500 rounded-md"
        >
          <p className="text-sm">تسجيل الخروج</p>
          <Image src={logoutIcon} alt="logout" width={20} height={20} />
        </Link>
      </PopoverContent>
    </Popover>
  );
}

export default AvatarPopover;
