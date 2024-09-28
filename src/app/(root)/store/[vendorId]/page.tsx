import React, { Suspense } from "react";
import CategoryList from "@/components/HomePage/CategoryList";
import BgCardsSlider from "@/components/General/BgCardsSlider";
import { bgSliderProducts } from "@/data/bgSlider";
import { Metadata } from "next";
import { schema } from "../../page";
import { notFound } from "next/navigation";
import { Category, Product } from "@/lib/types";
import VendorDetailsHero from "@/components/StoresPage/VendorDetailsHero";
import VendorProductsSearchResults from "@/components/StoresPage/VendorProductsSearchResults";
import VendorProductsDivided from "@/components/StoresPage/VendorProductsDivided";
import Loader from "@/components/General/Loader";
import { getVendorById, getVendors } from "@/lib/server-actions/vendor";
import { getVendorProductsByName } from "@/lib/server-actions/product";
import { getCategoryById } from "@/lib/server-actions/category";

type PropsType = {
  params: {
    vendorId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined
  };
};

export const revalidate = 1800

export default async function StorePage({
  params: { vendorId },
  searchParams
}: PropsType) {
  const { data } = schema.safeParse(searchParams)

  const [vendorRes, searchRes, categoryRes] = await Promise.all([
    getVendorById(vendorId),
    getVendorProductsByName({
      query: data?.query || '',
      vendorId,
      categoryId: data?.category
    }),
    getCategoryById(data?.category || '')
  ])

  if (vendorRes.hasError && ![404, 500].includes(vendorRes.statusCode)) throw new Error(vendorRes.message) 
  
  if (!vendorRes.data) notFound()
  
  return (
    <main className="space-y-12 pb-12 min-h-[70vh]">
      <VendorDetailsHero
        query={data?.query}
        category={data?.category}
        logo={vendorRes.data.logo}
      />
      <CategoryList
        categories={vendorRes.data.productCategories as Category[]}
        getItemsLengthFor="vendorProducts"
        vendorId={vendorId}
        selectedCategory={data?.category || ""}
        baseRoute={`/store/${vendorId}?${
          data?.query ? `query=${data.query}&` : ""
        }category=`}
        stopNavigateScroll
      />
      {data?.query ? (
        <VendorProductsSearchResults
          products={searchRes.data || []}
          query={data?.query}
          category={categoryRes.data?.name}
          page={data.page || 0}
        />
      ) : vendorRes.data.products.length ? (
        <>
          <Suspense fallback={
            <div className="w-full h-[400px] flex items-center justify-center">
              <Loader />
            </div>
          }>
            <VendorProductsDivided
              products={vendorRes.data.products as Product[]}
              categories={vendorRes.data.productCategories as Category[]}
              category={data?.category}
            />
          </Suspense>
          <BgCardsSlider products={bgSliderProducts} />
        </>
        ) : (
          <div className="max-w-6xl h-[200px] px-4">
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
              <p className="font-medium">No products here</p>
            </div>
          </div>
      )}
    </main>
  );
}

export const generateStaticParams = async () => { 
  const { data } = await getVendors()

  return data?.map(vendor => ({
    vendorId: vendor._id
  })) || []
}

export const generateMetadata = async ({
  params: { vendorId },
  searchParams,
}: PropsType): Promise<Metadata | undefined> => {
  const { data } = schema.safeParse(searchParams);

  const vendorRes = await getVendorById(vendorId);

  if (vendorRes.hasError) return

  return data?.query && data.category
    ? {
        title: `Store - ${vendorRes.data?.name} - ${vendorRes.data?.productCategories} - Search Result - ${data.query}`,
        description: `Search results for ${data.query} on ${vendorRes.data?.name}`,
      }
    : data?.query
    ? {
        title: `Store - ${vendorRes.data?.name} - Search Result - ${data.query}`,
        description: `Search results for ${data.query} on ${vendorRes.data?.name}`,
      }
    : data?.category
    ? {
        title: `Store - ${vendorRes.data?.name} - ${vendorRes.data?.productCategories}}`,
        description: `Browse ${vendorRes.data?.name} products`,
      }
    : {
        title: `Store - ${vendorRes.data?.name}`,
        description: `Browse products of ${vendorRes.data?.name}`,
      };
};
