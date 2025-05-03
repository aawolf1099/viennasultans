'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/lib/firebase/useFirebase';

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useFirebase();

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect to players page
    router.push('/admin/players');
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Redirecting...</div>
    </div>
  );
} 