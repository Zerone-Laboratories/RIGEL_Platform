'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Button from '@/components/button';
import AnimatedLogo from '@/components/animated-logo';
import Navbar from '@/components/navbar';

interface UserData {
  id: string;
  name: string;
  email: string;
  organization?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchUserProfile();
  }, [token, router, fetchUserProfile]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar currentPage="dashboard" />
        <div className="font-literata grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-64px)] p-8 pb-20 gap-16 sm:p-20 relative">
          {/* Background animated logo */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
            <AnimatedLogo
              width={900}
              height={900}
              className="fixed"
              loading={true}
            />
          </div>
          
          <main className="flex flex-col gap-[32px] row-start-2 items-center relative z-10">
            <div className="text-lg">Loading...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar currentPage="dashboard" />
      <div className="font-literata grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-64px)] p-8 pb-20 gap-16 sm:p-20 relative">
        {/* Background animated logo */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
          <AnimatedLogo
            width={900}
            height={900}
            className="fixed"
            loading={isLoading}
          />
        </div>
        
        <main className="flex flex-col gap-[32px] row-start-2 items-center relative z-10 w-full max-w-4xl">
          <div className="w-full">
            {/* Welcome Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome back, {userData?.name}!
              </h2>
              <p className="text-gray-300">
                You are now logged into the RIGEL Platform.
              </p>
            </div>

          {/* User Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              User Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Name
                </label>
                <p className="text-white">{userData?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <p className="text-white">{userData?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Organization
                </label>
                <p className="text-white">
                  {userData?.organization || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Account Status
                </label>
                <p className={`${userData?.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {userData?.isVerified ? 'Verified' : 'Pending Verification'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Member Since
                </label>
                <p className="text-white">
                  {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              Quick Actions
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button size="medium" className="w-full">
                Update Profile
              </Button>
              <Button size="medium" className="w-full">
                Security Settings
              </Button>
              <Button size="medium" className="w-full">
                API Access
              </Button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
