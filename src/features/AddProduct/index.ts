import { getAddingProductInfo } from './model/selectors/getAddingProductInfo/getAddingProductInfo';
import { AddProductType } from './model/types/AddProduct';
import { addProductReducer } from './model/slice/addProductSlice';
import { AddProductModal } from './ui/AddProductModal/AddProductModal';

export type { AddProductType }
export { 
    AddProductModal, 
    addProductReducer, 
    getAddingProductInfo
}