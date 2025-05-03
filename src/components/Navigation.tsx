'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFirebase } from '@/lib/firebase/useFirebase';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useFirebase();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#DB3986]">
                Vienna Sultans
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-[#DB3986] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/team"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/team')
                    ? 'border-[#DB3986] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Team
              </Link>
              <Link
                href="/fixtures"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/fixtures')
                    ? 'border-[#DB3986] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Fixtures
              </Link>
              <Link
                href="/gallery"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/gallery')
                    ? 'border-[#DB3986] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/contact')
                    ? 'border-[#DB3986] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-[#DB3986] rounded-md hover:bg-[#DB3986]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-white bg-[#DB3986] rounded-md hover:bg-[#DB3986]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986]"
              >
                Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#DB3986]"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        className="sm:hidden"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/')
                ? 'bg-[#DB3986]/10 border-[#DB3986] text-[#DB3986]'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link
            href="/team"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/team')
                ? 'bg-[#DB3986]/10 border-[#DB3986] text-[#DB3986]'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Team
          </Link>
          <Link
            href="/fixtures"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/fixtures')
                ? 'bg-[#DB3986]/10 border-[#DB3986] text-[#DB3986]'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Fixtures
          </Link>
          <Link
            href="/gallery"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/gallery')
                ? 'bg-[#DB3986]/10 border-[#DB3986] text-[#DB3986]'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/contact')
                ? 'bg-[#DB3986]/10 border-[#DB3986] text-[#DB3986]'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Contact
          </Link>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#DB3986] flex items-center justify-center text-white">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
} 