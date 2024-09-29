'use client'

import { accountLinks } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks';
import { DeliveryAddress, deliveryActions } from '@/redux-store/store-slices/DeliverySlice';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton, User } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const UserHeaderCard = () => {
  // Redux hooks for dispatch and selecting user and addressList
  const dispatch = useAppDispatch();
  const addressList = useAppSelector((state) => state.delivery.addressList);
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // Load delivery address list from localStorage
  useEffect(() => {
    const deliveryAddress = localStorage.getItem("delivery address list");

    if (deliveryAddress) {
      try {
        // Parse and set delivery address list
        const parsedData: DeliveryAddress[] = JSON.parse(deliveryAddress);
        dispatch(deliveryActions.setDeliveryAddressList(parsedData));
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch]);

  // Update localStorage with new addressList
  useEffect(() => {
    if (addressList.length > 0) {
      localStorage.setItem(
        "delivery address list",
        JSON.stringify(addressList)
      );
    }
  }, [addressList])

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Skeleton
          as="button"
          isLoaded={status !== "loading"}
          className="rounded-full"
        >
          <Avatar
            isBordered
            className="transition-transform"
            color="secondary"
            name={session?.user.profileUrl ? session?.user.fullName : undefined}
            size="sm"
            src={session?.user.profileUrl}
            showFallback
          />
        </Skeleton>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        onAction={(key) => key === 'logout' && signOut({ redirectTo: '/' })}
      >
        <DropdownSection>
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
            <Skeleton isLoaded={status !== "loading"} className="rounded-lg">
              <User
                name={session?.user.fullName || 'Guest'}
                description={session?.user.emailAddress}
                avatarProps={{
                  src: session?.user.profileUrl,
                  showFallback: true
                }}
                classNames={{
                  name: 'font-semibold',
                }}
              />
            </Skeleton>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection
          items={
            session?.user
              ? accountLinks.filter((link) => link.link !== "/account/sign-out")
              : []
          }
        >
          {(link) => (
            <DropdownItem key={link.link} href={link.link}>
              {link.title}
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownItem
          key={session?.user ? "logout" : "/sign-in"}
          color={session?.user ? "danger" : "success"}
          href={session?.user ? undefined : `/sign-in?${new URLSearchParams({ callbackUrl: pathname}).toString()}`}
        >
          {session?.user ? "Log Out" : "Sign In"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserHeaderCard