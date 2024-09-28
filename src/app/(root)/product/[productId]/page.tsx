import ProductsList from "@/components/General/ProductsList";
import ProductDetailsSection from "@/components/ProductDetailsPage/ProductDetailsSection";
import { getProductById, getProducts } from "@/lib/server-actions/product";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PropsType = {
  params: {
    productId: string
  }
}

export const revalidate = 1800 // 30 minutes

const ProductDetails = async ({ params: { productId } }: PropsType) => {
  // Fetch product details and suggested products in parallel
  const [productRes, suggestedProductsRes] = await Promise.all([
    getProductById(productId), // Fetch product details
    getProducts({ page: 0, perPage: 20 }) // Fetch suggested products
  ])

  // If there is an error and it's not a 404 or 500 error, throw an error
  if (productRes.hasError && ![404, 500].includes(productRes.statusCode)) throw new Error(productRes.message)

  // If there is no product data, return a 404 error page
  if (!productRes.data) notFound()
  
  // Render the component
  return (
    <main className="w-full flex flex-col gap-10 min-h-[70vh]">
      <ProductDetailsSection product={productRes.data} />
      <ProductsList
        title="Suggested for you"
        products={suggestedProductsRes.data?.products || []}
        className="pb-12"
        rows={suggestedProductsRes.data?.products && suggestedProductsRes.data.products.length >= 10 ? 2 : 1}
        showCartBtn
      />
    </main>
  );
}

export const generateMetadata = async ({ params: { productId } }: PropsType): Promise<Metadata | undefined> => {
  const productRes = await getProductById(productId)

  if (productRes.hasError) return

  return {
    title: productRes.data?.name,
    description: productRes.data?.description,
  }
}

export const generateStaticParams = async () => {
  const res = await getProducts()

  if (!res.data?.products) return []
  
  return res.data.products.map(product => ({
    productId: product._id
  }))
}

export default ProductDetails