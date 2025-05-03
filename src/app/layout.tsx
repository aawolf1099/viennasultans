import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import { FirebaseProvider } from '@/lib/firebase/useFirebase';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vienna Sultans Cricket Club",
  description: "Official website of Vienna Sultans Cricket Club - Your premier cricket destination in Vienna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <FirebaseProvider>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              {children}
            </main>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
