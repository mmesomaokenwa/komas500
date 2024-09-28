'use server'

import { revalidatePath } from "next/cache";
import { customFetch, fetchWithAuth } from ".";
import { CartItem, FetchResult, Product, ProductsResponse } from "../types";

export const getProducts = async (params?: {
  page?: number;
  perPage?: number;
}): Promise<ProductsResponse> => {
  try {
    let res
    
    if (params) {
      res = await customFetch(
        `/product?page=${params.page}&perPage=${params.perPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      res = await customFetch(
        `/product`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch products",
      data: null,
    };
  }
};

export const getProductById = async (
  productId: string
): Promise<FetchResult<Product | null>> => {
  try {
    const res = await customFetch(`/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch product",
      data: null,
    };
  }
};

export const getProductsByName = async (
  { query, categoryId }:
  { query: string, categoryId?: string }
): Promise<FetchResult<Product[] | null>> => {
  try {
    const res = await customFetch(`/product?name=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const products = await res.json() as FetchResult<Product[] | null>;

    return categoryId
      ? {
          ...products,
          data: products.data?.filter((product) =>
            typeof product.category === "string"
              ? product.category === categoryId
              : product.category._id === categoryId
          ) || null,
        }
      : products;
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch products",
      data: null,
    };
  }
};

export const getProductsByCategory = async (
  categoryId: string
): Promise<FetchResult<Product[] | null>> => {
  try {
    const res = await customFetch(`/product?category_id=${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch products",
      data: null,
    };
  }
};

export const getProductsByVendor = async (
  vendorId: string
): Promise<FetchResult<Product[]>> => {
  try {
    const res = await customFetch(`/vendor/products/${vendorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch products",
      data: [],
    };
  }
};

export const getProductsByVendorCategory = async ({
  categoryId,
  vendorId,
}: {
  categoryId: string;
  vendorId: string;
}): Promise<FetchResult<Product[] | null>> => {
  try {
    const res = await getProductsByCategory(categoryId);

    return {
      ...res,
      data:
        res.data?.filter((product) =>
          typeof product.vendor === "string"
            ? product.vendor === vendorId
            : product.vendor._id === vendorId
        ) || null,
    };
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to fetch products",
      data: null,
    };
  }
};

export const getVendorProductsByName = async ({ vendorId, query, categoryId }: { vendorId: string, query: string, categoryId?: string }): Promise<FetchResult<Product[] | null>> => {
  try {
    const res = categoryId
      ? await getProductsByVendorCategory({ categoryId, vendorId })
      : await getProductsByVendor(vendorId);

    return {
      ...res,
      data: res.data?.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) || null
    }
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: error.message,
      data: null
    }
  }
}

export const addProductToCart = async ({ productId, quantity }: { productId: string, quantity: number }): Promise<FetchResult<null>> => {
  try {
    const res = await fetchWithAuth(`/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    revalidatePath('/cart')
    
    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to add product to cart",
      data: null,
    }
  }
}

export const removeProductFromCart = async ({ productId, count }: { productId: string, count: number }): Promise<FetchResult<null>> => { 
  try {
    const res = await fetchWithAuth(`/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, count }),
    });

    revalidatePath('/cart')
    
    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to remove product from cart",
      data: null,
    }
  }
}

export const getCartProducts = async (): Promise<FetchResult<CartItem[] | null>> => {
  try {
    const res = await fetchWithAuth(`/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      statusCode: error.code,
      hasError: true,
      message: "Failed to get cart products",
      data: null,
    }
  }
}