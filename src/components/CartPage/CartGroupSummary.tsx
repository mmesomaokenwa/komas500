'use client'

import { formatNumber } from '@/lib/utils'
import React, { useMemo, useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';
import { CartItem } from '@/lib/types';
import { useAppSelector } from '@/redux-store/hooks';
import CheckoutOptionsModal from './CheckoutOptionsModal';
import { Button } from '@nextui-org/react';

type PropsType = {
  cartItems: CartItem[]
  vendor: string
}

const CartGroupSummary = ({ cartItems, vendor }: PropsType) => {
  const [open, setOpen] = useState(false)

  const vendorAssociatedItems = useAppSelector(state => state.cart.products.filter(product => typeof product.vendor === 'string' ? product.vendor === vendor : product.vendor._id === vendor))

  const totalPrice = useMemo(() => {
    return vendorAssociatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  }, [vendorAssociatedItems])
  return (
    <div className="flex flex-col gap-4 w-full md:w-3/4 mx-auto">
      <div className="flex justify-start">
        <p className="md:text-lg font-semibold">Cart Summary</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm">Subtotal</p>
        <p className="md:text-lg font-semibold">
          <span className="line-through">N</span>
          {formatNumber(totalPrice)}
        </p>
      </div>
      <Button
        size='lg'
        onClick={() => setOpen(true)}
        className="flex items-center justify-between rounded-xl bg-yellow-400 text-white"
      >
        <span className="text-xs md:text-sm font-semibold">
          <span className="line-through">N</span>
          {formatNumber(totalPrice)}
        </span>
        <span className="text-xs md:text-sm flex items-center gap-2">
          Checkout Shoprite
          <IoIosArrowRoundForward size={15} />
        </span>
      </Button>
      <CheckoutOptionsModal open={open} onOpenChange={setOpen} vendorId={vendor} />
    </div>
  );
}

export default CartGroupSummary