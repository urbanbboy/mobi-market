import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ProductList } from "@entities/Product"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Pagination } from "@shared/ui/Pagination/Pagination"
import { getProducts } from "../model/slice/favoriteProductsPageSlice"
import { getProductPageError } from "../model/selectors/getFavoriteProductPageError/getProductPageError"
import { getFavoriteProductPageIsLoading } from "../model/selectors/getFavoriteProductPageIsLoading/getFavoriteProductPageIsLoading"
import { fetchFavoriteProductsList } from "../model/services/fetchFavoriteProductsList"
import cls from './FavoriteProductsPage.module.scss'
import { getFavoriteProductPage } from "../model/selectors/getFavoriteProductPage/getFavoriteProductPage"

export const FavoriteProductsPage = () => {
    const dispatch = useAppDispatch()
    const products = useSelector(getProducts.selectAll)
    const isLoading = useSelector(getFavoriteProductPageIsLoading)
    const error = useSelector(getProductPageError)
    const { currentPage, totalPages, totalItems } = useSelector(getFavoriteProductPage)

    useEffect(() => {
        dispatch(fetchFavoriteProductsList(currentPage !== 1 ? 1 : currentPage))
    }, [dispatch, currentPage])

    const handlePageChange = (newPage: number) => {
        dispatch(fetchFavoriteProductsList(newPage));
    };

    return (
        <div className={cls.Products}>
            <div className={cls.Header}>
                <div className={cls.goBack}>
                    <Link to={'/'}>
                        <img src="/left_arrow.svg" alt="left-arrow" />
                        <span>Назад</span>
                    </Link>
                </div>
                <div className={cls.Title}>Понравившиеся</div>
            </div>
            <div className={cls.ProductContent}>
                <ProductList
                    fetchUpdatedData={fetchFavoriteProductsList}
                    currentPage={currentPage}
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