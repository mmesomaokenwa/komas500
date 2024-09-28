import React from "react";
import ProductCard from "./ProductCard";
import CustomSlider from "./CustomSlider";
import { Product } from "@/lib/types";
import { EmblaOptionsType } from "embla-carousel";
import { NextArrow, PrevArrow } from "../HomePage/CustomArrows";

type PropsType = {
  title: string;
  products: Product[];
  showCartBtn?: boolean;
  rows?: number;
  className?: string;
};

const settings: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  skipSnaps: true,
  breakpoints: {
    "(min-width: 640px)": {
      slidesToScroll: 1,
    },
    "(min-width: 1024px)": {
      slidesToScroll: 2,
    },
    "(min-width: 1280px)": {
      slidesToScroll: 3,
    },
  },
};

const ProductsList = ({
  products,
  showCartBtn,
  className,
  title,
  rows,
}: PropsType) => {
  return (
    <section className={`w-full px-2 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold ml-2 mb-4">{title}</h2>
        {products.length ? (
          <CustomSlider
            options={settings}
            rows={rows}
            customArrows={{
              prev: <PrevArrow />,
              next: <NextArrow />,
            }}
            classNames={{
              innerWrapperItem:
                "w-1/2 sm:w-1/3 md:w-1/4 lg:w-[calc(100%/5)] px-2 pb-2",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showCartBtn={showCartBtn}
              />
            ))}
          </CustomSlider>
        ) : (
          <div className="w-[calc(100%-16px)] h-[200px] mx-auto flex items-center justify-center rounded-md bg-gray-100">
            <p className="font-medium text-center">No products here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsList;
