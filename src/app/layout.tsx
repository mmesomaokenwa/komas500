import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux-store/StoreProvider";
import { WidthProvider } from "@/providers/WidthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";
import UIProvider from "@/providers/UIProvider";
import AuthProvider from "@/providers/AuthProvider";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KOMAS500",
    template: "%s | KOMAS500",
  },
  description: "An e-commerce web application",
};

export default function GeneralLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={[quicksand.className, "custom-scrollbar"].join(" ")}>
        <AuthProvider>
          <StoreProvider>
            <QueryProvider>
              <WidthProvider>
                <ThemeProvider
                  attribute="class"
                  enableSystem={false}
                  enableColorScheme
                  forcedTheme="light"
                >
                  <UIProvider>
                    {children}
                    <Toaster />
                  </UIProvider>
                </ThemeProvider>       
              </WidthProvider>
            </QueryProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
