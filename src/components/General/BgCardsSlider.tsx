import React from 'react'
import BgCard from './BgCard';
import CustomSlider from './CustomSlider';
import { EmblaOptionsType } from 'embla-carousel';
import { NextArrow, PrevArrow } from '../HomePage/CustomArrows';
import { Product } from '@/lib/types';

type PropsType = {
  products: Product[]
}

const settings: EmblaOptionsType = {
  loop: true,
  skipSnaps: true,
  slidesToScroll: 1,
}

const BgCardsSlider = ({products}: PropsType) => {
  return (
    <section className="max-w-6xl mx-auto px-2">
      <CustomSlider
        options={settings}
        customArrows={{
          prev: <PrevArrow />,
          next: <NextArrow />,
        }}
        classNames={{ innerWrapperItem: "w-full" }}
      >
        {products.map((product) => (
          <BgCard
            key={product._id}
            product={product}
            backgroundImage={product.images[0]}
            text={product.description}
            className="h-[300px] md:h-[400px] mx-2"
          />
        ))}
      </CustomSlider>
    </section>
  );
}

export default BgCardsSlider