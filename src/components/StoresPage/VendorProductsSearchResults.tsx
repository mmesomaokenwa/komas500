import React from 'react'
import StoresPaginationControls from './StoresPaginationControls';
import ProductCard from '../General/ProductCard';
import { Product } from '@/lib/types';
import { divideIntoArrays } from '@/lib/utils';

type PropsType = {
  query: string
  products: Product[]
  page: number
  category?: string
}

const VendorProductsSearchResults = ({ query, page, products, category }: PropsType) => {
  const searchPages = divideIntoArrays({
    data: products,
    itemsPerArray: 24
  })

  const currentPage = searchPages[page] || []

  return (
    <div className="max-w-6xl px-4 mx-auto space-y-12">
      <h2 className="text-2xl font-semibold">
        Search results for {query} {!!category && `in ${category}`}
      </h2>
      {currentPage.length ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentPage.map((product) => (
              <ProductCard key={product._id} product={product} showCartBtn />
            ))}
          </div>
          <div className="w-full flex justify-center -mt-6">
            <StoresPaginationControls
              pageCount={searchPages.length}
              currentPage={page}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-[200px] rounded-md bg-gray-100 flex items-center justify-center">
          <p className="font-medium">No products found</p>
        </div>
      )}
    </div>
  );
}

export default VendorProductsSearchResults