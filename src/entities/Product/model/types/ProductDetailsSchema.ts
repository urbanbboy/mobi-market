import { Product } from "./Product";

export interface ProductDetailsSchema {
    data?: Product;
    isLoading?: boolean;
    error?: string;
}