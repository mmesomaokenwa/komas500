'use client'

import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from 'react-paystack/dist/types'
import { formatNumber } from '@/lib/utils';
import { Button } from '@nextui-org/react';

type Props = {
  totalAmount: number
  email: string
  phone: string
}

type SuccessData = {
  message: string
  reference: string
  status: 'success' | 'failure'
  trans: string
  transaction: string
  trxref: string
}
  
const FinalCheckoutForm = ({ totalAmount, email, phone }: Props) => {
  const config: PaystackProps = {
    email,
    amount: totalAmount * 100,
    phone,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer ID",
          value: "1234567890",
          variable_name: "customer_id",
        },
        {
          display_name: "Email",
          value: email,
          variable_name: "email",
        },
        {
          display_name: "Phone Number",
          value: phone,
          variable_name: "phone_number",
        },
      ],
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };
  const initializePayment = usePaystackPayment(config)
  const [status, setStatus] = useState({
    success: false,
    error: false,
    processing: false
  })
  const [isOpen, setIsOpen] = useState(false)

  const onSuccess = async (data: SuccessData) => {
    console.log(data)
    setStatus({
      success: false,
      error: false,
      processing: true
    })
    const wait = (status: SuccessData['status']) => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(status === "success")
        }, 3000)
      })
    }
    
    const result = await wait(data.status)

    if (result) {
      setStatus({
        success: true,
        error: false,
        processing: false
      })
    } else {
      setStatus({
        success: false,
        error: true,
        processing: false
      })
    }

    setIsOpen(true)
  }

  const onClose = () => {
    console.log('closed')
  }
  
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 p-6 pt-4 rounded-2xl shadow-sm bg-white">
          <p className="font-medium text-sm md:text-base">Order Summary</p>
          <div className="flex justify-between">
            <p className="text-xl md:text-2xl font-semibold">Total Amount</p>
            <p className="text-xl md:text-2xl font-semibold text-green-500">
              <span className="line-through">N</span>
              {formatNumber(totalAmount)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 pt-4 rounded-2xl shadow-sm bg-white">
          <p className="font-medium text-sm md:text-base">
            You are about paying
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-xl md:text-2xl font-semibold">Total Amount</p>
              <p className="text-xl md:text-2xl font-semibold text-green-500">
                <span className="line-through">N</span>
                {formatNumber(totalAmount)}
              </p>
            </div>
            {/* <p className="font-medium text-lg md:text-xl">{card.type} {hideCardNumber(card.number)}</p>
            <p className="font-medium text-lg md:text-xl">Exp: {card.expiry}</p> */}
          </div>
          <button className="text-xl md:text-2xl font-semibold text-green-500 border-t border-green-500 pt-4">
            Choose a different payment method
          </button>
        </div>
      </div>
      <Button
        disabled={status.processing}
        isLoading={status.processing}
        size="lg"
        className="h-full text-xl font-medium bg-green-500 text-white p-4 rounded-xl mx-8 md:mx-20"
        onPress={() => initializePayment({ onSuccess, onClose })}
      >
        {status.processing ? "Processing..." : `Pay Now N${formatNumber(totalAmount)}`}
      </Button>
      <ConfirmationModal
        status={status}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

export default FinalCheckoutForm