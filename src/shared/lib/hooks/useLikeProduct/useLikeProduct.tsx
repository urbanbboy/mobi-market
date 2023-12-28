import { useState } from 'react';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';
import { likeProductById, unlikeProductById } from '@entities/Product';

export const useLikeProduct = () => {
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useAppDispatch()

    const likeProduct = async (id: number) => {
        try {
            await dispatch(likeProductById(id))
            setIsLiked(true);
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const unlikeProduct = async (id: number) => {
        try {
            await dispatch(unlikeProductById(id))
            setIsLiked(false);
        } catch (error) {
            console.error('Error unliking product:', error);
        }
    };

    return { isLiked, likeProduct, unlikeProduct };
};