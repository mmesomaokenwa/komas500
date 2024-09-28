import React from 'react'
import { DeliveryAddress } from '@/redux-store/store-slices/DeliverySlice';
import { numberToOrdinal } from '@/lib/utils';
import { Input } from '@nextui-org/react';

type PropsType = {
  index: number
  deliveryInfo: DeliveryAddress
  addPhoneNumber?: boolean
  controls?: React.ReactNode
}

const DeliveryAddressDisplay = ({ index, deliveryInfo, addPhoneNumber, controls }: PropsType) => {
  const { houseNumber, streetAddress, city, state } = deliveryInfo
  return (
    <div
      className={`p-4 w-full flex flex-col gap-4 rounded-xl border ${
        index === 1 && "border-green-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {numberToOrdinal(index)} Shipping Info
        </h2>
        {controls}
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="First Name"
          labelPlacement="outside"
          defaultValue={deliveryInfo.firstName}
          isReadOnly
          size="lg"
          classNames={{ label: "font-medium" }}
        />
        <Input
          label="Last Name"
          labelPlacement="outside"
          defaultValue={deliveryInfo.lastName}
          isReadOnly
          size="lg"
          classNames={{ label: "font-medium" }}
        />
        <Input
          label="Email"
          labelPlacement="outside"
          defaultValue={deliveryInfo.emailAddress}
          isReadOnly
          size="lg"
          classNames={{ label: "font-medium" }}
        />
        {addPhoneNumber && (
          <Input
            label="Phone Number"
            labelPlacement="outside"
            defaultValue={deliveryInfo.phoneNumber}
            isReadOnly
            size="lg"
            classNames={{ label: "font-medium" }}
          />
        )}
        <Input
          label="Address"
          labelPlacement="outside"
          defaultValue={`${houseNumber} ${streetAddress} ${city} ${state}`}
          isReadOnly
          size="lg"
          classNames={{ label: "font-medium" }}
        />
      </div>
    </div>
  );
}

export default DeliveryAddressDisplay