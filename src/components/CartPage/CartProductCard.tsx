import React from 'react'
import CartControls from './CartControls';
import Image from 'next/image';
import { CartItem } from '@/lib/types';

type PropsType = {
  className?: string
  cartItem: CartItem
}

const CartProductCard = ({ className, cartItem }: PropsType) => {
  return (
    <div className={`flex items-center justify-between gap-4 p-2 pr-6 rounded-2xl border shadow-md ${className}`}>
      <div className="flex items-center gap-3">
        <Image
          src={cartItem.product.images[0]}
          alt={cartItem.product.name}
          height={100}
          width={100}
          className="size-14 md:size-20 object-cover rounded-3xl bg-gray-200"
        />
        <div className="flex flex-col gap-2">
          <h3 className="md:text-lg font-semibold">{cartItem.product.name}</h3>
          <p className="text-xs md:text-sm">{cartItem.product.description}</p>
        </div>
      </div>
      <CartControls productId={cartItem.product._id} quantity={cartItem.quantity} />
    </div>
  );
}

export default CartProductCard