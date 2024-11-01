import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";
import { Readex_Pro } from "next/font/google";
import ThemeColor from "@/components/statusBarColor/ThemeColor";
import { RoleProvider } from "@/contexts/RoleContext";

const readex_Pro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "DeepData",
  description:
    "DeepData is a platform for all your data needs as a store manager.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "deepdata",
    "ai in business",
    "dd",
    "deepdata app",
    "dd app",
    "ai",
  ],
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "default",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
};

export default function RootLayout({ children }) {
  return (
    <RoleProvider>
    <html lang="ar" suppressHydrationWarning={true}>
      <body className={readex_Pro.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColor />
          {children}
        </ThemeProvider>
      </body>
    </html>
    </RoleProvider>
  );
}
