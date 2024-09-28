'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type PropsType = {
  label: string
  route: string
  icon?: React.ReactNode
  classNames?: {
    wrapper?: string
    label?: string
  }
  onClick?: () => void
}

const NavLink = ({label, route, icon, classNames, onClick}: PropsType) => {
  const pathname = usePathname()
  return (
    <Link href={route} aria-label={label} onClick={onClick}>
      <div
        className={cn(
          `flex justify-center items-center space-x-2 hover:text-[#3BB77E] ${
            pathname === route ? "text-[#3BB77E]" : ""
          } ${classNames?.wrapper}`
        )}
      >
        {icon}
        <span className={cn(`text-sm ${classNames?.label}`)}>{label}</span>
      </div>
    </Link>
  );
}

export default NavLink