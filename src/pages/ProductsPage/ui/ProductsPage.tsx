import { Header } from "@widgets/Header"
import { ProductList } from "@entities/Product"
import { useEffect } from "react"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { fetchProductList } from "../model/services/fetchProductsList"
import { useSelector } from "react-redux"
import { getProducts } from "../model/slice/productPageSlice"
import { getProductPageIsLoading } from "../model/selectors/getProductPageIsLoading/getProductPageIsLoading"
import { getProductPageError } from "../model/selectors/getProductPageError/getProductPageError"
import { getProductPage } from "../model/selectors/getProductPage/getProductPage"
import { Pagination } from "./Pagination/Pagination"
import cls from './ProductsPage.module.scss'

export const ProductsPage = () => {
    const dispatch = useAppDispatch()
    const products = useSelector(getProducts.selectAll)
    const isLoading = useSelector(getProductPageIsLoading)
    const error = useSelector(getProductPageError)
    const { currentPage, totalPages, totalItems } = useSelector(getProductPage)

    useEffect(() => {
        dispatch(fetchProductList(currentPage))
    }, [dispatch, currentPage])

    const handlePageChange = (newPage: number) => {
        dispatch(fetchProductList(newPage));
    };

    return (
        <div>
            <Header />
            <div className={cls.ProductContent}>
                <ProductList
                    products={products}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
            <div className={cls.Pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={totalItems}
                />
            </div>
        </div>
    )
}