import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <div className="h-10 aspect-square border rounded-full flex items-center justify-center"></div>
    );
  const light = theme === "light";
  return (
    <div
      className="h-10 aspect-square border rounded-full flex items-center justify-center hover:cursor-pointer"
      onClick={() => setTheme(light ? "dark" : "light")}
    >
      {light ? (
        <Sun className="w-4 h-4 text-[#98A2B3]" strokeWidth={1.5} />
      ) : (
        <Moon className="w-4 h-4 text-[#98A2B3]" strokeWidth={1.5} />
      )}
    </div>
  );
};

export default ToggleTheme;
