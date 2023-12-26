export interface Images {
    id: number;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    images: Images[];
    short_description: string;
    full_description: string;
    user: number;
    phone_number?: string;
    like_count: number;
    liked_by_current_user: boolean;
}