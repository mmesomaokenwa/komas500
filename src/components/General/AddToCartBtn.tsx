'use client'

import { useAppDispatch } from '@/redux-store/hooks';
import { cartActions } from '@/redux-store/store-slices/CartSlice';
import React, { useState } from 'react'
import { addProductToCart } from '@/lib/server-actions/product';
import { useToast } from "@/hooks/use-toast";
import { Product } from '@/lib/types';
import { Button } from '@nextui-org/react';

type BtnProps = {
  children: React.ReactNode;
  className?: string;
  product: Product
};

const AddToCartBtn = ({ children, className, product }: BtnProps) => {
  const [isAdding, setIsAdding] = useState(false)

  const dispatch = useAppDispatch();

  const { toast } = useToast()

  const handleClick = async () => {
    try {
      setIsAdding(true)

      // TODO: implement add to cart
      const res = await addProductToCart({ productId: product._id, quantity: 1 })

      if (res.hasError) throw new Error(res.message)
      
      dispatch(cartActions.addToCart({ ...product, quantity: 1 }))

      toast({
        description: 'Added to cart',
      })
    } catch (error) {
      console.log(error)
      toast({
        description: 'Failed to add to cart',
        variant: 'destructive'
      })
    } finally {
      setIsAdding(false)
    }
  };

  return (
    <Button
      disabled={isAdding}
      isLoading={isAdding}
      size='sm'
      radius='sm'
      className={`w-full h-fit p-3 bg-green-500 text-white transition ${
        className && className
      }`}
      onPress={handleClick}
    >
      {isAdding ? 'Adding' : children}
    </Button>
  );
};

export default AddToCartBtn