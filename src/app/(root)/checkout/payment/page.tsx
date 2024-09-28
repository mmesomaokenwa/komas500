import FinalCheckoutForm from '@/components/CheckoutPage/FinalCheckoutForm'
import { getCartProducts } from '@/lib/server-actions/product';
import { Metadata } from 'next';
import React from 'react'
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Payment - Checkout',
  description: 'Confirm payment',
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const schema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  vendor: z.string().optional(),
})

const Payment = async ({ searchParams }: Props) => {
  const { data } = schema.safeParse(searchParams)

  const cart = await getCartProducts()

  if (cart.hasError) { 
    throw new Error('Failed to fetch cart products')
  }

  const cartItems = data?.vendor ? cart.data?.filter(item => item.product.vendor === data.vendor) : cart.data

  const totalAmount = cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  return (
    <main className="bg-gray-100 w-full min-h-[70vh]">
      <div className="flex flex-col max-w-6xl gap-16 px-4 py-14 mx-auto">
        <FinalCheckoutForm totalAmount={totalAmount || 0} email={data?.email || ''} phone={data?.phone || ''} />
        <div className="flex flex-col mx-8 md:mx-20 gap-8 text-center text-sm md:text-base">
          <p>
            By tapping "PAY NOW" I accept Payment Terms & Conditions, General
            Terms and Conditions, and Privacy and Cookie Notice
          </p>
          <p>
            Please note: Komas500 will never ask you for your password, PIN, CVV
            or full card details over the phone or via email.Need help? Contact
            us
          </p>
        </div>
      </div>
    </main>
  );
}

export default Payment