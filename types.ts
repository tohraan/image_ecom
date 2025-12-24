
export enum View {
    HOME,
    PRODUCT_DETAIL,
    CART,
    CHECKOUT,
}

export interface Product {
    id: number;
    name: string;
    series: string;
    price: number;
    description: string;
    imageUrl: string;
    isNew?: boolean;
    colors?: { name: string; class: string }[];
    sizes?: string[];
    features?: { icon: string; title: string; text: string }[];
    fullDescription?: string;
    rating?: number;
}

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}
