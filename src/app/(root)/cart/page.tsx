import CartGroups from '@/components/CartPage/CartGroups';
import { getCartProducts } from '@/lib/server-actions/product';
import { CartItem } from '@/lib/types';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your KOMAS500 cart',
}

export default async function Cart() {
  // Fetch cart data and render it
  const res = await getCartProducts();

  // if (res.hasError) throw new Error(res.message);

  // Separate products into their respective vendors
  const productsByVendors = res.data?.reduce((acc, cartItem) => {
    if (!acc[cartItem.product.vendor as string]) {
      acc[cartItem.product.vendor as string] = []
    };

    acc[cartItem.product.vendor as string].push(cartItem);

    return acc;
  }, {} as { [key: string]: CartItem[] })
  return (
    <main className="w-full min-h-[70vh] bg-[#FEFAFA]">
      {res.data?.length ? (
        <CartGroups cart={productsByVendors || {}} />
      ) : (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold">Your cart is empty</h2>
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            Explore products
          </Link>
        </div>
      )}
    </main>
  );
}
