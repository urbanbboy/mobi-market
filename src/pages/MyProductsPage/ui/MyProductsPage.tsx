import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { getMyProductsIsLoading } from "../model/selectors/getMyProductsIsLoading/getMyProductsIsLoading"
import { getProducts } from "../model/slice/myProductsSlice"
import { getMyProductsError } from "../model/selectors/getMyProductsError/getMyProductsError"
import { getMyProducts } from "../model/selectors/getMyProducts/getMyProducts"
import { ProductList } from "@entities/Product"
import { Pagination } from "@shared/ui/Pagination/Pagination"
import { fetchMyProductsList } from "../model/service/fetchMyProductsList"
import cls from './MyProductsPage.module.scss'

export const MyProductsPage = () => {
    const dispatch = useAppDispatch()
    const products = useSelector(getProducts.selectAll)
    const isLoading = useSelector(getMyProductsIsLoading)
    const error = useSelector(getMyProductsError)
    const { currentPage, totalPages, totalItems } = useSelector(getMyProducts)

    useEffect(() => {
        dispatch(fetchMyProductsList(currentPage))
    }, [dispatch, currentPage])

    const handlePageChange = (newPage: number) => {
        dispatch(fetchMyProductsList(newPage));
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
                <div className={cls.Title}>Мои товары</div>
            </div>
            <div className={cls.ProductContent}>
                <ProductList
                    fetchUpdatedData={fetchMyProductsList}
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
