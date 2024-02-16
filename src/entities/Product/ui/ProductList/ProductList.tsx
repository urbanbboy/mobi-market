import { fetchFavoriteProductsList } from "@pages/FavoriteProductsPage/model/services/fetchFavoriteProductsList";
import { fetchProductList } from "@pages/ProductsPage/model/services/fetchProductsList";
import { Product } from "../../model/types/Product";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import { Loader } from "@shared/ui/Loader";
import cls from './ProductList.module.scss'

interface ProductListProps {
    products: Product[];
    currentPage: number;
    fetchUpdatedData: typeof fetchFavoriteProductsList | typeof fetchProductList;
    isEditable?: boolean;
    isLoading?: boolean;
    error?: string;
}

export const ProductList = (props: ProductListProps) => {
    const {
        products,
        currentPage,
        fetchUpdatedData,
        isEditable,
        isLoading,
        error
    } = props

    if (isLoading) {
        return (
            <div className={cls.Loading}>
                <Loader />
            </div>
        )
    }
    if (error) {
        return (
            <div>
                Ошибка при загрузке товаров
            </div>
        )
    }
    return (
        <div className={cls.ProductList}>
            {products.length > 0
                ? products.map((item) => (
                    <ProductListItem
                        currentPage={currentPage}
                        fetchUpdatedData={fetchUpdatedData}
                        key={item.id}
                        product={item}
                        isEditable={isEditable}
                    />
                ))
                : <div className={cls.Empty}>
                    <img src={'/empty.svg'} alt="empty" />
                    <span className={cls.Title}>Ой пусто</span>
                </div>
            }
        </div>
    )
}
