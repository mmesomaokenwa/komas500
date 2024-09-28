'use client'

import { useAppSelector } from '@/redux-store/hooks'
import Image from 'next/image'
import React from 'react'

const UserTopCard = () => {
  const user = useAppSelector(state => state.user)
  return (
    <div className="flex items-center gap-2 p-4 rounded-xl bg-gray-100 md:mr-auto">
      <Image
        src={user.profileUrl || "/Images/Header/profile.jpeg"}
        alt="profile"
        width={50}
        height={50}
        className="rounded-full size-16 md:size-20"
      />
      <div className="flex flex-col gap-2">
        <p className="md:text-xl font-semibold">{user.fullName}</p>
        <p className="text-sm">{user.emailAddress}</p>
      </div>
    </div>
  );
}

export default UserTopCard