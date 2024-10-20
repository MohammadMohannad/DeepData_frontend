import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logout from "@/assets/logout-icon.svg";
import avatar from "@/assets/Avatar.svg";
import axios from 'axios';
import React, { useState, useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { Dot } from "lucide-react";
import { handleLogout } from "../logout";
import { useRouter } from "next/navigation";

export function AvatarPopover({ img }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_data`, {
        withCredentials: true,  // Include credentials if necessary
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userDataResponse = await fetchUserData();
        setUserData(userDataResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return <div>Loading...</div>;  // Loading UI

  if (error) return <div>Error: {error.message || "An error occurred"}</div>;  // Error handling

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full h-full rounded-full">
          <Image
            src={img || avatar}
            alt="avatar"
            sizes="(100vw, 100vh)"
            fill
            priority
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-2" align="start">
        <div className="w-full rounded-md flex-col flex items-center cursor-pointer justify-center p-2 gap-1.5 border mb-4 h-24 overflow-hidden">
          <div className="relative z-20 w-10 h-10 rounded-full">
            <Image
              src={img || avatar}
              alt="avatar"
              sizes="(100vw, 100vh)"
              width={40}
              height={40}
            />
            <Dot
              size={70}
              className="text-green-400 absolute bottom-[-30px] z-30"
            />
          </div>
          <div className="text-center">
            <p className="text-sm">{userData ? userData.name : "User"}</p>
            <p className="text-[9px] text-muted-foreground">
            {userData ? userData.email : "N/A"}            </p>
          </div>
        </div>
        <Link
          href="#"
          onClick={async (e) => {
            e.preventDefault(); // Prevent default link behavior
            await handleLogout(router); // Call the Axios logout function
          }}
          className="w-full rounded-md bg-red-100 text-red-500 flex items-center justify-center p-2 gap-2"
        >
          <p className="text-sm">تسجيل الخروج</p>
          <Image src={logout} alt="logout" width={20} height={20} />
        </Link>
      </PopoverContent>
    </Popover>
  );
}
export default AvatarPopover;