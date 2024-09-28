import React from "react";
import Image from "next/image";
import LocationSelector from "./LocationSelector";
import ProductSearch from "./ProductSearch";
import StaggeredText from "../General/StaggeredText";

const textsList = [
  ["Enjoy easy and fast same", "day delivery with", "Komas500"],
  ["Fast and hassle-free", "checkout with", "Komas500"],
  ["Shop top-notch items", "only at", "Komas500"],
  ["Komas500:", "Your destination for", "high-quality products"],
];

type PropsType = {
  query?: string
  category?: string
}

export default function HeroSection({ query, category }: PropsType) {
  return (
    <section className="mt-4 w-full h-full">
      <LocationSelector />
      <div className="flex mb-4 relative">
        <div
          className="mt-4 w-full md:w-[70%] h-full md:rounded-r-xl"
          style={{
            backgroundImage: `url(/Images/Home/homebg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-center py-28 w-full">
            <div className="inline-block text-left w-full">
              {/* <Image
                src="/Images/Home/Vector.png"
                width={200}
                height={200}
                className="absolute -top-14 left-0"
                alt="vector"
              /> */}
              <div className="lg:max-w-[calc(1152px-25vw)] px-4 w-full lg:ml-auto">
                <StaggeredText
                  el="h2"
                  text={textsList[0]}
                  className="text-[30px] md:text-[45px] lg:text-[55px] font-semibold text-white leading-15"
                  stagger={0.1}
                  duration={0.2}
                  delay={0}
                  once
                  // onReset={() => {
                  //   setIndex(prev => prev < textsList.length - 1 ? prev + 1 : 0);
                  // }}
                  // repeat={textsList.length}
                  // repeatDelay={20000}
                />

                <p className="text-white my-4">
                  Delivery fee starts from (₦200-₦400)
                </p>
                <ProductSearch
                  searchFor="product"
                  addFilter
                  q={query}
                  category={category}
                  classNames={{ wrapper: 'md:max-w-[450px] lg:max-w[600px]', input: 'w-full' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] hidden md:inline-block my-auto">
          <Image
            src="/Images/Home/food.png"
            alt="food"
            width={500}
            height={500}
            className="-ml-4"
          />
        </div>
      </div>
    </section>
  );
}
