import React from 'react'
import ProductsList from '../General/ProductsList';
import { Category, Product } from '@/lib/types';
import { divideProductsByCategory } from '@/lib/utils';

type PropsType = {
  products: Product[]
  categories: Category[]
  category?: string
}

const VendorProductsDivided = async ({ products, categories, category }: PropsType) => {
  const vendorProducts = category
    ? products.filter((product) => typeof product.category === "string" ? product.category === category : product.category._id === category)
    : products;

  const productsByCategories = divideProductsByCategory(vendorProducts)
  
  return (
    <>
      {Object.entries(productsByCategories).map(([categoryId, products]) => (
        <ProductsList
          key={categoryId}
          title={
           categories.find(
              (category) => category._id === categoryId
            )?.name || ""
          }
          products={products}
          showCartBtn
        />
      ))}
    </>
  );
}

export default VendorProductsDivided