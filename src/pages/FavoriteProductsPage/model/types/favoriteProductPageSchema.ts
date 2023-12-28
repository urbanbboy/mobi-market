import { Product } from "@entities/Product";
import { EntityState } from "@reduxjs/toolkit";


export interface favoriteProductPageSchema extends EntityState<Product, number> {
    isLoading?: boolean;
    error?: string;

    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export interface FetchFavoriteProductListFulfilledPayload {
    page: number;
    results: Product[];
    count: number;
    next: string;
    previous: string;
}