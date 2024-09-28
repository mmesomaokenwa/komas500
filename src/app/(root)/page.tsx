import ProductsList from "@/components/General/ProductsList";
import BgCard from "@/components/General/BgCard";
import CategoryList from "@/components/HomePage/CategoryList";
import HeroSection from "@/components/HomePage/HeroSection";
import Stores from "@/components/HomePage/Stores";
import BgCardsSlider from "@/components/General/BgCardsSlider";
import { bgSliderProducts } from "@/data/bgSlider";
import { z } from "zod";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import Loader from "@/components/General/Loader";
import { getProducts, getProductsByCategory, getProductsByName } from "@/lib/server-actions/product";
import { getCategories, getCategoryById } from "@/lib/server-actions/category";
import { getVendors } from "@/lib/server-actions/vendor";
import { divideProductsByCategory } from "@/lib/utils";
import HomeError from "@/components/HomePage/HomeError";
import VendorProductsSearchResults from "@/components/StoresPage/VendorProductsSearchResults";

type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const schema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().positive().optional()
});

export default async function Home({ searchParams }: PropsType) {
  const { data } = schema.safeParse(searchParams);
  return (
    <main className="overflow-x-hidden space-y-12 pb-12 min-h-[70vh]">
      <HeroSection query={data?.query} category={data?.category} />
      <ErrorBoundary errorComponent={HomeError}>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        }>
          <DisplayCategoriesAndProducts
            query={data?.query || ''}
            category={data?.category || ''}
            page={data?.page || 0}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

const DisplayCategoriesAndProducts = async ({ page, category, query }: { page: number, category: string, query: string }) => {
  const [products, searchedProducts, categories, categoryRes, vendors] = await Promise.all([
    getProducts({ page, perPage: 1000 }),
    getProductsByName({ query, categoryId: category }),
    getCategories(),
    getCategoryById(category),
    getVendors()
  ])

  if (products.hasError && ![404, 500].includes(products.statusCode)) throw new Error(products.message)
  
  const productsByCategories = divideProductsByCategory(products.data?.products || [])
  return (
    <>
      <CategoryList
        title="Categories"
        categories={categories.data || []}
        getItemsLengthFor="allProducts"
        selectedCategory={category}
        baseRoute="/store?category="
      />
      {query ? (
        <VendorProductsSearchResults
          products={searchedProducts.data || []}
          query={query}
          category={categoryRes.data?.name}
          page={page}
        />
      ) : (
        <>
          {Object.entries(productsByCategories)
            .slice(0, 1)
            .map(([categoryId, products]) => (
              <ProductsList
                key={categoryId}
                title={
                  categories.data?.find(
                    (category) => category._id === categoryId
                  )?.name || ""
                }
                products={products}
                showCartBtn
              />
            ))}
          <Stores stores={vendors.data?.slice(0, 7) || []} />
          {Object.entries(productsByCategories)
            .slice(1, 2)
            .map(([categoryId, products]) => (
              <ProductsList
                key={categoryId}
                title={
                  categories.data?.find(
                    (category) => category._id === categoryId
                  )?.name || ""
                }
                products={products}
                showCartBtn
              />
            ))}
          <BgCardsSlider products={bgSliderProducts} />
          {Object.entries(productsByCategories)
            .slice(2, 6)
            .map(([categoryId, products]) => (
              <ProductsList
                key={categoryId}
                title={
                  categories.data?.find(
                    (category) => category._id === categoryId
                  )?.name || ""
                }
                products={products}
                showCartBtn
              />
            ))}
          <section className="px-4">
            <BgCard
              backgroundImage="/Images/Home/flatTommy/flatTommy.png"
              text="Enjoy easy and fast same day delivery on this jellof Spaghetti Combo."
              className="max-w-[69rem] mx-auto min-h-[300px]"
              product={bgSliderProducts[0]}
            />
          </section>
          {Object.entries(productsByCategories)
            .slice(6)
            .map(([categoryId, products]) => (
              <ProductsList
                key={categoryId}
                title={
                  categories.data?.find(
                    (category) => category._id === categoryId
                  )?.name || ""
                }
                products={products}
                showCartBtn
              />
            ))}
        </>
      )}
    </>
  );
}