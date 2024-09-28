export type Products = Product[]

export interface Item {
  id: number
  imageUrl: string
  name: string
  itemCount: number
}

export interface FetchResult<T> {
  statusCode: number
  message: string
  hasError: boolean
  data: T
}

export type CategoriesResponse = FetchResult<Category[]>

export type ProductsResponse = FetchResult<{
  page: number
  perPage: number
  totalProductCount: number
  products: Product[]
} | null>

export type RegisterResponse = FetchResult<null>;

export type LoginResponse = FetchResult<{
  accessToken: string
  refreshToken: string
  roles: any[]
  userType: string
} | null>

export type VerifyUserResponse = FetchResult<{
  accessToken: string
  refreshToken: string
}>

export type User = {
  _id?: string;
  profileUrl: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  gender: 'male' | 'female' | '';
  dateOfBirth: string;
  address: string;
  postCode: string;
  state: string;
  country: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
}

export interface BaseData {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface Product extends BaseData {
  price: number;
  length: number;
  breadth: number;
  width: number;
  quantity: number;
  region: string;
  isDeleted: boolean;
  images: string[];
  category: Category | string;
  brand: Brand | string;
  vendor: Vendor | string;
  isLive: boolean;
  sku: string;
  tags: string[];
  status: string;
};

export interface Category extends BaseData { }

export interface Brand extends BaseData { }

export interface Vendor extends BaseData {
  address: string;
  noOfStaff: string;
  email: string;
  isDeleted: boolean;
  logo: string;
  products: string[] | Product[];
  productCategories: string[] | Category[]
}

export interface CartItem extends Omit<BaseData, 'name' | 'description'> {
  userId: string
  product: Product
  quantity: number
  length: string
  breadth: string
}