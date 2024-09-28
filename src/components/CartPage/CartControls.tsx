'use client'

import React, { useState } from 'react'
import CartCounter from './CartCounter';
import { formatNumber } from '@/lib/utils';
import { BsTrash3 } from 'react-icons/bs';
import { removeProductFromCart } from '@/lib/server-actions/product';
import { useRouter } from 'next/navigation';
import { BiLoader } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks';
import { cartActions } from '@/redux-store/store-slices/CartSlice';

type PropsType = {
  productId: string
  quantity: number
};

const CartControls = ({ productId, quantity }: PropsType) => {
  const product = useAppSelector(state => state.cart.products.find(product => product._id === productId))
  const dispatch = useAppDispatch()

  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      // TODO: implement delete
      const res = await removeProductFromCart({ productId, count: quantity })

      if (res.hasError) throw new Error(res.message)
      
      dispatch(cartActions.removeFromCart({ productId }))

      router.refresh()
    } catch (error) {
      console.log(error)
      setIsDeleting(false)
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <>
      <CartCounter productId={productId} currentQuantity={quantity} />
      <div className="flex items-center gap-6">
        <p className="text-sm md:text-base font-semibold">
          <span className="line-through">N</span>
          {product?.price && product.quantity && formatNumber(product.price * product.quantity)}
        </p>
        <button aria-label='Remove this product' onClick={handleDelete}>
          {isDeleting ? <BiLoader size={16} /> : <BsTrash3 size={16} />}
        </button>
      </div>
    </>
  );
}

export default CartControls