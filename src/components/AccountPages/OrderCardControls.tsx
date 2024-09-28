'use client'

import React, { Key } from 'react'
import { RxDotsVertical } from 'react-icons/rx'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from '@nextui-org/react';

const OrderCardControls = () => {
 const handleActions = (key: Key) => {}

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost">
          <RxDotsVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Order Actions" onAction={handleActions}>
        <DropdownItem key="view-details">View Details</DropdownItem>
        <DropdownItem key="track-order">Track Order</DropdownItem>
        <DropdownItem key="cancel-order" className="text-danger" color="danger">
          Cancel Order
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default OrderCardControls