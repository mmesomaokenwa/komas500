import React from 'react'
import CartProductCard from './CartProductCard'
import CartGroupSummary from './CartGroupSummary'
import TotalSummary from './TotalSummary'
import AnimatePresenseWrapper from '../General/AnimatePresenseWrapper'
import MotionWrapper from '../General/MotionWrapper'
import { CartItem } from '@/lib/types'

type PropsType = {
  isFirstGroup: boolean
  cartItems: CartItem[]
  totalItems: CartItem[]
  vendor: string
}

const CartGroup = ({ isFirstGroup, cartItems, totalItems, vendor }: PropsType) => {
  return (
    <section className={`${isFirstGroup && "relative"}`}>
      {isFirstGroup && (
        <div className="w-[350px] hidden md:block absolute -right-4 -top-4 border-[16px] rounded-2xl border-[#FEFAFA] after:md:absolute after:md:content-[''] after:md:top-0 after:md:left-0 after:md:size-10 bg-[#FEFAFA]">
          <TotalSummary cartItems={totalItems} imageSize="md" />
        </div>
      )}
      <div
        className={`flex flex-col gap-4 p-4 md:p-6 pb-8 sm:rounded-2xl bg-white ${
          isFirstGroup &&
          "after:md:absolute after:md:content-[''] after:md:size-10 after:md:bg-transparent after:md:border-[10px] after:md:border-l-0 after:md:border-b-0 after:md:border-[#FEFAFA] after:md:rounded-tr-3xl after:md:top-[-10px] after:md:right-[324px] after:md:z-10 before:md:absolute before:md:content-[''] before:md:size-10 before:md:bg-transparent before:md:border-[10px] before:md:border-l-0 before:md:border-b-0 before:md:border-[#FEFAFA] before:md:rounded-tr-3xl before:md:right-[-10px] before:md:top-[200px] before:md:mt-[48px] before:md:z-10"
        }`}
      >
        <div
          className={`w-12 aspect-square bg-gray-200 rounded-xl object-cover self-end ${
            isFirstGroup && "md:translate-x-[-340px]"
          }`}
        />
        <hr
          className={isFirstGroup ? "md:w-[calc(100%-340px)] w-1/2" : "w-1/2"}
        />
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="md:text-lg font-semibold">Company Cart</h2>
            <p className="text-xs md:text-sm">You have 4 item in your cart</p>
          </div>
          <div className="flex flex-col gap-4">
            <AnimatePresenseWrapper initial={false}>
              {cartItems.map((cartItem, index) => (
                <MotionWrapper
                  key={cartItem.product._id}
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto"
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                >
                  <CartProductCard
                    cartItem={cartItem}
                    className={
                      isFirstGroup
                        ? index === 0
                          ? "md:w-[calc(100%-340px)]"
                          : "md:!pr-[365px]"
                        : ""
                    }
                  />
                </MotionWrapper>
              ))}
            </AnimatePresenseWrapper>
          </div>
          <CartGroupSummary cartItems={cartItems} vendor={vendor} />
        </div>
      </div>
    </section>
  );
}

export default CartGroup