"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useFirebase } from "@/lib/firebase/useFirebase";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useFirebase();
  const router = useRouter();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Team", href: "/#team" },
    { name: "Matches", href: "/#matches" },
    { name: "Gallery", href: "/#gallery" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#000000] dark:bg-[#000000] backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <Link
              href="/"
              className="text-lg sm:text-2xl font-bold text-[#009cd4] hover:text-[#DB3986] dark:hover:text-[#DB3986] transition-colors whitespace-nowrap"
            >
              Vienna Sultans
            </Link>
            <div className="flex items-center justify-center w-20 h-10 sm:w-24 sm:h-12 overflow-hidden shrink-0">
              <Link href="/">
                <img
                  src="/images/club-logo.jpg"
                  alt="Vienna Sultans Logo"
                  className="w-full h-full object-contain cursor-pointer"
                />
              </Link>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-base font-medium text-[#009cd4] hover:text-[#DB3986] dark:hover:text-[#DB3986] transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DB3986] dark:bg-[#009cd4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Login/Logout Button */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/players"
                  className="px-3 py-2 text-base font-medium text-[#009cd4] hover:text-[#DB3986] dark:hover:text-[#DB3986] transition-colors relative group"
                >
                  Manage
                </Link>
                <span className="text-sm text-gray-700">{user.email}</span>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 text-base font-medium text-[#009cd4] hover:text-[#DB3986] dark:hover:text-[#DB3986] transition-colors relative group"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-[#DB3986] rounded-md hover:bg-[#DB3986]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986]"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Login/Logout Button */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/players"
                  className="px-3 py-2 text-base font-medium text-[#009cd4] hover:text-[#DB3986] dark:hover:text-[#DB3986] transition-colors relative group"
                >
                  Manage
                </Link>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 text-base font-medium text-[#009cd4] hover:text-[#DB3986] dark:hover:text-[#DB3986] transition-colors relative group"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm font-medium text-white bg-[#DB3986] rounded-md hover:bg-[#DB3986]/90"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#DB3986] dark:text-gray-300 hover:text-[#020123] dark:hover:text-[#009cd4] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-[#020123]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#DB3986] dark:text-gray-300 hover:text-[#020123] dark:hover:text-[#009cd4] hover:bg-gray-100 dark:hover:bg-[#020123]/80 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
