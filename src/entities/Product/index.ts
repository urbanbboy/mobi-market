import { ProductDetailsSchema } from './model/types/ProductDetailsSchema';
import { Product, Images } from './model/types/Product';

export type {
    Product,
    ProductDetailsSchema,
    Images,
}

export {ProductList } from './ui/ProductList/ProductList';
export { ProductListItem } from './ui/ProductListItem/ProductListItem';
export { ProductDetails } from "./ui/ProductDetails/ProductDetails";
export { productDetailsReducer } from './model/slice/productDetailsSlice';
export { likeProductById } from './model/services/likeProductById';
export { unlikeProductById } from './model/services/unlikeProductById';