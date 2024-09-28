import React from "react";
import LocationSelector from "@/components/HomePage/LocationSelector";
import PartnerStoresList from "@/components/StoresPage/PartnerStoreList";
import { Metadata } from "next";
import { schema } from "../page";
import StoresHeroSection from "@/components/StoresPage/StoresHeroSection";
import { divideIntoArrays } from "@/lib/utils";
import StoresPaginationControls from "@/components/StoresPage/StoresPaginationControls";
import { getVendors, getVendorsByCategory, getVendorsByName } from "@/lib/server-actions/vendor";
import { getCategoryById } from "@/lib/server-actions/category";

type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const revalidate = 1800

export default async function Stores({ searchParams }: PropsType) {
  const { data } = schema.safeParse(searchParams);

  const [vendorsRes, categoryRes, vendorsByCategoryRes, vendorsByNameRes] = await Promise.all([
    getVendors(),
    getCategoryById(data?.category || ''),
    getVendorsByCategory(data?.category || ''),
    getVendorsByName({
      query: data?.query || '',
      categoryId: data?.category
    })
  ]);

  if (vendorsRes.hasError) throw new Error(vendorsRes.message);

  const vendorPages = data?.query
    ? divideIntoArrays({
        data: vendorsByNameRes.data || [],
        itemsPerArray: 24,
      })
    : data?.category
    ? divideIntoArrays({
        data: vendorsByCategoryRes.data || [],
        itemsPerArray: 24,
      })
    : divideIntoArrays({
        data: vendorsRes.data || [],
        itemsPerArray: 24,
      });

  const currentPage = vendorPages[data?.page || 0] || []

  return (
    <main className="mt-4 w-full h-full min-h-[70vh]">
      <LocationSelector />
      <StoresHeroSection
        query={data?.query}
        category={data?.category}
      />
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-2xl mb-4 font-semibold">
          {categoryRes.data?.name && data?.query
            ? `Search results for ${data.query.toLowerCase()} in ${categoryRes.data.name.toLowerCase()}`
            : categoryRes.data?.name
            ? `Available stores to buy ${categoryRes.data.name.toLowerCase()}`
            : data?.query
            ? `Search results for ${data.query.toLowerCase()}`
            : "Available stores in Komas500"}
        </h2>
        <div
          className="mb-10 py-24 md:py-32 h-full rounded-xl text-center"
          style={{
            backgroundImage: `url(/Images/Home/stores/storebg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-white text-[40px] font-semibold">Komas500 Store</p>
        </div>
        <div
          className={`mb-20 ${
            !currentPage.length &&
            "w-full h-[200px] rounded-md bg-gray-100 flex items-center justify-center"
          }`}
        >
          {currentPage.length ? (
            <>
              <PartnerStoresList
                stores={currentPage}
                className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              />
              <div className="mt-6 w-full flex justify-center">
                <StoresPaginationControls
                  pageCount={vendorPages.length}
                  currentPage={data?.page || 0}
                />
              </div>
            </>
          ) : (
            <p className="text-center">No vendors found</p>
          )}
        </div>
      </section>
    </main>
  );
}

export function generateMetadata({ searchParams }: PropsType): Metadata {
  const { data } = schema.safeParse(searchParams);

  return data?.query && data.category
    ? {
        title: `Search Result - ${data.query} - ${data.category}`,
        description: `Search results for ${data.query} on ${data.category}`,
      }
    : data?.query
    ? {
        title: `Search Result - ${data.query}`,
        description: `Search results for ${data.query}`,
      }
    : data?.category
    ? {
        title: `Browse - ${data.category}`,
        description: `Browse ${data.category} products`,
      }
    : {
        title: "Our Stores",
        description: "Browse our partner stores",
      };
}
