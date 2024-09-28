import Image from 'next/image';
import React from 'react'
import ProductSearch from '../HomePage/ProductSearch';
import StaggeredText from '../General/StaggeredText';

type PropsType = {
  query?: string
  category?: string
}

const StoresHeroSection = ({ query, category }: PropsType) => {
  const text = [
    "Enjoy easy and fast same day delivery when you shop",
    "from any",
    "of the stores below.",
  ];

  return (
    <section className="flex mx-auto mb-4">
      <div
        className="mt-4 w-[100%] h-full relative py-24 px-4 flex items-center justify-center"
        style={{
          backgroundImage: `url(/Images/Home/homebg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl w-full flex justify-between items-end relative">
          <div className='relative z-10 lg:px-4'>
            <div className='max-w-[800px]'>
              <StaggeredText
                el="h2"
                text={text}
                className="text-[30px] md:text-[42px] font-semibold text-white leading-15 relative"
                stagger={0.1}
                duration={0.2}
                delay={0}
                once
              />
            </div>

            <p className="text-white my-4 relative">
              Delivery fee starts from (₦200-₦400)
            </p>
            <div className="flex items-start">
              <ProductSearch
                searchFor="store"
                q={query}
                category={category}
                addFilter
                classNames={{
                  wrapper: "md:max-w-[450px] lg:max-w[600px] z-10",
                  input: "w-full",
                }}
              />
            </div>
          </div>
          <div className="absolute right-0 md:right-40">
            <Image
              src="/Images/Store/alldrinks.png"
              alt="all drinks"
              width={250}
              height={300}
              className="z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoresHeroSection