"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Head from "next/head"; // Import Head component

export default function ThemeColor() {
  const { theme, resolvedTheme } = useTheme(); // Use next-themes to get the current theme

  useEffect(() => {
    const setThemeColor = () => {
      const currentTheme = resolvedTheme || theme; // Use the resolved theme if available
      const themeColor = currentTheme === "dark" ? "#09090B" : "#ffffff";

      let metaTag = document.querySelector('meta[name="theme-color"]');
      if (metaTag) {
        metaTag.setAttribute("content", themeColor);
      } else {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", "theme-color");
        metaTag.setAttribute("content", themeColor);
        document.head.appendChild(metaTag);
      }
    };

    setThemeColor(); // Set the theme color when the component mounts
  }, [theme, resolvedTheme]); // Re-run effect when theme changes

  return (
    <Head>
      {/* Provide an initial meta tag as a fallback */}
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
