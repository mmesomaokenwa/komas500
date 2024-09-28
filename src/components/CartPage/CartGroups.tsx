import React from 'react'
import CartGroup from './CartGroup'
import TotalSummary from './TotalSummary'
import { CartItem } from '@/lib/types'

type PropsType = {
  cart: { [key: string]: CartItem[] }
}

const CartGroups = ({ cart }: PropsType) => {
  return (
    <div className='max-w-6xl flex flex-col mx-auto sm:p-4 py-14 gap-10'>
      {Object.entries(cart).map(([vendor, cartItems], index) => (
        <CartGroup
          key={vendor}
          cartItems={cartItems}
          vendor={vendor}
          totalItems={Object.values(cart).flatMap(items => items)}
          isFirstGroup={index === 0}
        />
      ))}
      <TotalSummary cartItems={Object.values(cart).flatMap(items => items)} />
    </div>
  )
}

export default CartGroups