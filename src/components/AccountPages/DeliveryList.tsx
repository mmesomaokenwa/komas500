'use client'

import React from 'react'
import DeliveryAddressDisplay from './DeliveryAddressDisplay';
import { useAppSelector } from '@/redux-store/hooks';

const DeliveryList = () => {
 const addressList = useAppSelector(state => state.delivery.addressList)
  return (
    <>
      {addressList.length ? (
        addressList.map((address, index) => (
          <DeliveryAddressDisplay
            key={index}
            index={index + 1}
            deliveryInfo={address}
          />
        ))
      ) : (
        <div className="col-span-1 md:col-span-2 h-[200px] bg-gray-100 flex items-center justify-center rounded-md">
          <p className="text-center font-medium">No address found</p>
        </div>
      )}
    </>
  );
}

export default DeliveryList