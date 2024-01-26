export interface Images {
    id: number;
    image: string;
}

export interface AddProductType {
    name: string;
    price: string;
    uploaded_images: Images[];
    short_description: string;
    full_description: string;

    isLoading?: boolean;
    error?: string;
}