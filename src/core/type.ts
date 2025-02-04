export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
}

export interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    cart: { [key: string]: number };
    searchQuery: string;
    sortBy: 'price' | 'rating' | null;
    currentPage: number;
    itemsPerPage: number;
}

export interface RootState {
    products: ProductState;
}

export interface ModalProps {
    id: string;
    content: React.ComponentType<any>;
    contentProps?: Record<string, any>;
    size?: 'small' | 'medium' | 'large';
    onClose?: () => void;
    isOpen: boolean;
}

export interface ModalState {
    modals: Record<string, ModalProps>;
}

export interface RootState {
    products: ProductState;
    modal: ModalState;
}


export interface ModalStateProps {
    id: string;
    content: React.ComponentType<any>;
    contentProps?: Record<string, any>;
    size?: 'small' | 'medium' | 'large';
    onClose?: () => void;
    isOpen: boolean;
}
