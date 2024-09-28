'use client'

import { addProductToCart, removeProductFromCart } from '@/lib/server-actions/product';
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks';
import { cartActions } from '@/redux-store/store-slices/CartSlice';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

type PropsType = {
  productId: string
  currentQuantity: number
};

const CartCounter = ({ productId, currentQuantity }: PropsType) => {
  const product = useAppSelector(state => state.cart.products.find(product => product._id === productId))
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [quantity, setQuantity] = useState<number>(product?.quantity || currentQuantity)

  useEffect(() => {
    if (product) setQuantity(product.quantity)
  }, [product])
  
  useEffect(() => {
    setQuantity(currentQuantity)
  }, [currentQuantity])

  const handleIncreaseQuantity = async () => {
    product &&
      dispatch(
        cartActions.addToCart({
          ...product,
          quantity: 1,
        })
      );
    
    const res = await addProductToCart({ productId, quantity: 1 })

    if (res.hasError) return dispatch(
      cartActions.removeFromCart({
        productId,
        quantity: 1,
      })
    );

    router.refresh()
  }

  const handleDecreaseQuantity = async () => {
    dispatch(
      cartActions.removeFromCart({
        productId,
        quantity: 1,
      })
    );

    const res = await removeProductFromCart({ productId, count: 1 })

    if (res.hasError) return (
      product &&
      dispatch(
        cartActions.addToCart({
          ...product,
          quantity: 1,
        })
      )
    );
    
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <span className="md:text-lg font-semibold">{quantity}</span>
      <div className="flex flex-col gap-1">
        <button
          aria-label='Increase quantity'
          className="p-0"
          onClick={handleIncreaseQuantity}
        >
          <VscTriangleUp size={20} className='-m-[6px]' />
        </button>
        <button
          aria-label='Decrease quantity'
          className="p-0 disabled:text-gray-300"
          disabled={quantity <= 1}
          onClick={handleDecreaseQuantity}
        >
          <VscTriangleDown size={20} className='-m-[6px]' />
        </button>
      </div>
    </div>
  );
}

export default CartCounter