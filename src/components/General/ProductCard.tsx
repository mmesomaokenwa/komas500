import { calculateDiscountPrice } from "@/lib/utils";
import React, { Suspense } from "react";
import { BsStarFill } from "react-icons/bs";
import AddToCartBtn from "./AddToCartBtn";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import Link from "next/link";
import AddToWishlist from "./AddToWishlist";
import { Product } from "@/lib/types";
import ServerImageRender from "./ServerImageRender";
import { getBrandById } from "@/lib/server-actions/brand";
import { getCategoryById } from "@/lib/server-actions/category";

type PropsType = {
  product: Product;
  showCartBtn?: boolean;
  className?: string;
};

const ProductCard = ({ product, showCartBtn, className }: PropsType) => {
  // const discountedPrice = calculateDiscountPrice(
  //   product.price,
  //   product.discountPercentage
  // );
  return (
    <div
      className={`bg-white flex flex-col shadow-sm rounded-xl gap-2 ${className}`}
    >
      <Link
        href={`/product/${product._id}`}
        aria-label={product.name}
        className="flex items-center justify-center"
      >
        {product.images.length ? (
          <ServerImageRender
            folderName="products"
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="size-[180px] object-contain"
          />
        ) : (
          <div className="size-[180px] bg-gray-200" />
        )}
      </Link>
      <div className="bg-green-500/50 w-full h-2" />
      <div className="px-4 pb-4 grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 line-clamp-1 w-[80%]">
              {typeof product.brand !== "string" ? (
                product.brand.name
              ) : (
                <Suspense
                  fallback={
                    <span className="w-[40%] h-4 bg-gray-100 animate-pulse rounded-lg" />
                  }
                >
                  <BrandName brandId={product.brand} />
                </Suspense>
              )}{" "}
              /{" "}
              <span className="text-gray-500 font-medium">
                {typeof product.category !== "string" ? (
                  product.category.name
                ) : (
                  <Suspense
                    fallback={
                      <span className="w-[40%] h-4 bg-gray-100 animate-pulse rounded-lg" />
                    }
                  >
                    <CategoryName categoryId={product.category} />
                  </Suspense>
                )}
              </span>
            </p>
            <AddToWishlist id={product._id} />
          </div>
          <Link aria-label={product.name} href={`/product/${product._id}`}>
            <h3 className="font-medium line-clamp-1 text-sm xs:text-base">
              {product.name}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <p className="text-green-500 text-sm font-medium">
              <span className="line-through">N</span>
              {product.price.toFixed(0)}
            </p>
            {/* <p className="text-gray-400 line-through">N{product.price}</p> */}
          </div>
          {showCartBtn ? (
            <AddToCartBtn
              product={product}
              className="flex items-center justify-center gap-2 text-xs !p-2 h-[35px]"
            >
              <PiShoppingCartSimpleLight className="text-sm" />
              Add
            </AddToCartBtn>
          ) : (
            <ul className="flex gap-[2px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index}>
                  <BsStarFill className="text-yellow-500" size={12} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export const BrandName = async ({ brandId }: { brandId: string }) => {
  const res = await getBrandById(brandId)

  return <span>{res.data?.name}</span>;
}

export const CategoryName = async ({ categoryId }: { categoryId: string }) => {
  const res = await getCategoryById(categoryId)

  return <span>{res.data?.name}</span>;
}

export default ProductCard;
