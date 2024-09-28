'use client'

import { accountLinks } from '@/constants';
import { useUser } from '@/hooks/queries';
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks';
import { DeliveryAddress, deliveryActions } from '@/redux-store/store-slices/DeliverySlice';
import { userActions } from '@/redux-store/store-slices/UserSlice';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect } from 'react'

const UserHeaderCard = () => {
  // Redux hooks for dispatch and selecting user and addressList
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const addressList = useAppSelector((state) => state.delivery.addressList);
  const { data, isLoading } = useUser()

  // update user's details on data change
  useEffect(() => {
    // Update user state
    data && dispatch(userActions.setUser(data));
  }, [data, dispatch]);

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
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection>
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection
          items={accountLinks.filter(
            (link) => link.link !== "/account/sign-out"
          )}
        >
          {(link) => (
            <DropdownItem key={link.link} href={link.link}>
              {link.title}
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserHeaderCard