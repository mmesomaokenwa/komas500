'use client'

import { formatNumber } from '@/lib/utils';
import { useAppSelector } from '@/redux-store/hooks';
import { Image } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';
import { CartItem } from '@/lib/types';
import CheckoutOptionsModal from './CheckoutOptionsModal';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

type PropsType = {
  cartItems: CartItem[]
  imageSize?: 'sm' | 'md' | 'lg' 
}

const TotalSummary = ({ imageSize }: PropsType) => {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const totalPrice = useAppSelector(state => state.cart.products.reduce((acc, product) => acc + (product.quantity * product.price), 0))

  const generateSize = (): string =>
    imageSize
      ? imageSize === "lg"
        ? "size-20"
        : imageSize === "md"
        ? "size-16"
        : imageSize === "sm"
        ? "size-14"
        : "size-20"
      : "size-14 md:size-20";

  return (
    <div className="bg-white sticky md:relative bottom-0 sm:rounded-2xl p-4">
      <div className="flex flex-col gap-4 p-4 rounded-2xl border">
        <div className="flex items-center justify-between">
          <p className="md:text-lg font-semibold">Total Summary</p>
          <Image
            src={session?.user.profileUrl || ""}
            alt="user"
            width={100}
            height={100}
            className={`rounded-full bg-gray-200 ${generateSize()}`}
          />
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
          className="flex items-center justify-between rounded-xl bg-green-500 text-white"
        >
          <span className="text-xs md:text-sm font-semibold">
            <span className="line-through">N</span>
            {formatNumber(totalPrice)}
          </span>
          <span className="text-xs md:text-sm flex items-center gap-2">
            Checkout All
            <IoIosArrowRoundForward size={15} />
          </span>
        </Button>
        <CheckoutOptionsModal open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );
}

export default TotalSummary