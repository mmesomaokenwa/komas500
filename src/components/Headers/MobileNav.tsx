'use client'

import React from 'react'
import { headerNavLinks } from '@/constants';
import { NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react';
import NavLink from '../General/NavLink';

type Props = {
  setIsOpen: (open: boolean) => void
}

const MobileNav = ({ setIsOpen }: Props) => {
  return (
    <NavbarMenu className='gap-10'>
      {headerNavLinks.map((item) => (
        <NavbarMenuItem key={item.route}>
          <NavLink
            label={item.label}
            route={item.route}
            icon={item.icon}
            onClick={() => setIsOpen(false)}
            classNames={{
              wrapper: 'w-full justify-start',
              label: 'text-sm',
            }}
          />
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
}

export default MobileNav