import React from 'react'
import ProductDetailsCard from './ProductDetailsCard';
import ProductImages from './ProductImages';
import { Product } from '@/lib/types';

type PropsType = {
  product: Product
}

const ProductDetailsSection = ({product}: PropsType) => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto p-4 py-14 md:py-16">
        <p className="text-sm text-gray-400 mb-2">
          {typeof product.category !== "string"
            ? product.category.name
            : undefined}{" "}
          / {typeof product.brand !== "string" ? product.brand.name : undefined}{" "}
          /{" "}
          {typeof product.vendor !== "string"
            ? product.vendor.name
            : undefined}
        </p>
        <div className="flex flex-col md:flex-row md:items-start gap-20 md:gap-12 lg:gap-20">
          <ProductImages images={product.images} />
          <ProductDetailsCard product={product} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsSection