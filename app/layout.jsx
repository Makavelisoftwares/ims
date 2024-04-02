import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intern Management system",
  description: "Intern management system",
};
export const dynamic='force-dynamic'

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
