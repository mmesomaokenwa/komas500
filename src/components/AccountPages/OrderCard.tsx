import Image from 'next/image';
import React from 'react'
import OrderCardControls from './OrderCardControls';

type PropsType = {
  className?: string
  status: string
}

const OrderCard = ({ className, status }: PropsType) => {
  return (
    <div
      className={`flex gap-4 p-2 pr-6 rounded-2xl border shadow-md ${className}`}
    >
      <Image
        src={"/Images/card.jpg"}
        alt="product name"
        height={100}
        width={100}
        className="w-16 md:w-20 object-cover rounded-3xl bg-gray-200"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between gap-4">
          <h3 className="md:text-lg font-semibold">Product Name</h3>
          <OrderCardControls />
        </div>
        <p className="text-xs md:text-sm">Product Description</p>
        <div className="flex items-center justify-between gap-8 text-xs md:text-sm font-medium">
          <p>Qty: 1</p>
          <p>
            <span className="line-through">N</span>
            7700
          </p>
        </div>
        <div className="flex items-center justify-between text-xs mt-2 font-medium">
          <p className="p-1 rounded bg-green-500 text-white uppercase">{status}</p>
          <p>On 12-06-2024</p>
        </div>
      </div>
    </div>
  );
}

export default OrderCard