'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux-store/hooks';
import { userActions } from '@/redux-store/store-slices/UserSlice';
import { logout } from '@/lib/server-actions/auth';
import { Button } from '@nextui-org/react';

const SignoutCard = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSignout = () => { 
    logout()
    dispatch(userActions.resetUser())
    router.push('/')
  }
  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Sign Out</h2>
      <p className="text-gray-500 px-4">
        Sign out your account from this device. This logs your account out of
        this device. Click Sign Out to continue.
      </p>
      <Button onPress={handleSignout} className="text-white bg-green-500 font-medium rounded-md p-2 px-6 md:w-[40%] lg:w-[30%] md:mx-auto">
        Sign Out
      </Button>
    </div>
  );
}

export default SignoutCard