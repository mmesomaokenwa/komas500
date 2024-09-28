import FilterSelect from '@/components/AccountPages/FilterSelect';
import OrderCard from '@/components/AccountPages/OrderCard';
import { Metadata } from 'next';
import React from 'react'
import { VscSettings } from 'react-icons/vsc';

export const metadata: Metadata = {
  title: 'Order History',
  description: 'Order History',
}

const OrderHistory = () => {
  return (
    <main className="flex-1 bg-white py-8 px-4 md:px-6">
      <div className="flex h-full flex-col gap-6 overflow-y-auto custom-scrollbar ![--thumb-color:#9c9a9a] ![--scrollbar-width:5px]">
        <div className="flex flex-col">
          <div className="flex flex-wrap md:items-center justify-between gap-2">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Order History</h2>
              <p className="text-sm font-semibold md:hidden">
                List of previously purchased products
              </p>
            </div>
            <div className='ml-auto'>
              <FilterSelect />
            </div>
          </div>
          <p
            aria-hidden
            className="text-sm font-semibold hidden md:block"
          >
            List of previously purchased products
          </p>
        </div>
        <div className="flex flex-col gap-3 pb-2 lg:p-6 rounded-xl lg:border">
          {Array.from({ length: 4 }).map((_, index) => (
            <OrderCard key={index} status="delivered" />
          ))}
        </div>
      </div>
    </main>
  );
}

export default OrderHistory