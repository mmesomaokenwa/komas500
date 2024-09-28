import { calculateDiscountPrice, formatNumber } from '@/lib/utils';
import React from 'react'
import { BsStarFill } from 'react-icons/bs';
import AddToCartBtn from '../General/AddToCartBtn';
import Accordion from './Accordion';
import { BiCheckCircle } from 'react-icons/bi';
import { Product } from '@/lib/types';

type PropsType = {
  product: Product
}

const ProductDetailsCard = ({product}: PropsType) => {
  // const discountedPrice = calculateDiscountPrice(product.price, product.discountPercentage);
  return (
    <div className="flex flex-col flex-1 gap-8">
      <div className="flex flex-1 flex-col gap-6 py-8 px-4 md:px-8 rounded-xl border-2 border-gray-100">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-xl font-bold text-green-500">
            <span className="line-through">N</span> {product.price.toFixed(2)}
          </p>
        </div>
        {/* <p className="flex items-center justify-end font-semibold text-black gap-3">
          <span className="flex items-center gap-1">
            <BsStarFill className="text-yellow-400 mb-[2px]" />
            {4}/5
          </span>
          <span className="font-normal text-gray-400">|</span>
          <span className="flex gap-1">
            {formatNumber(1175)}{" "}
            <span className="font-normal text-gray-500">Reviews</span>
          </span>
        </p> */}
        <p className="text-left break-words">
          {product.description}
        </p>
        <AddToCartBtn
          product={product}
          className="flex items-center justify-center gap-2 px-10 rounded-lg py-3 h-[55px] text-lg"
        >
          Add to cart
        </AddToCartBtn>
        <Accordion
          data={[
            {
              title: "Description",
              description: product.description,
            },
            {
              title: "Return Policy",
              description:
                "Aliquam faucibus, odio nec commodo aliquam, neque felis placerat dui, a porta ante lectus dapibus est. Aliquam a bibendum mi, condimentum est. Mauris arcu odio, vestibulum quis dapibus sit amet.",
            },
            {
              title: "Privacy Policy",
              description:
                "Aliquam faucibus, odio nec commodo aliquam, neque felis placerat dui, a porta ante lectus dapibus est. Aliquam a bibendum mi, condimentum est. Mauris arcu odio, vestibulum quis dapibus sit amet.",
            },
          ]}
        />
      </div>
      <ul className="w-full flex flex-col gap-2 px-8">
        <li className="flex items-center gap-2">
          <BiCheckCircle className="text-green-500" />
          <p className="text-xs font-medium">
            Free delivery on orders over{" "}
            <span className="text-sm text-yellow-400">
              <span className="line-through">N</span>3,149
            </span>
          </p>
        </li>
        <li className="flex items-center gap-2">
          <BiCheckCircle className="text-green-500" />
          <p className="text-xs font-medium">
            Order before 12:00pm for same day dispatch
          </p>
        </li>
        <li className="flex items-center gap-2">
          <BiCheckCircle className="text-green-500" />
          <p className="text-xs font-medium">
            Support & ordering open 7 day a week
          </p>
        </li>
      </ul>
    </div>
  );
}

export default ProductDetailsCard