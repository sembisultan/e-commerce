import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductState } from '@/core/type';

import modalReducer from './ModalStore';

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    cart: {},
    searchQuery: '',
    sortBy: null,
    currentPage: 1,
    itemsPerPage: 10,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.filteredProducts = state.products.filter(product =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
            if (state.sortBy) {
                const sorted = [...state.filteredProducts];
                if (state.sortBy === 'price') {
                    sorted.sort((a, b) => a.price - b.price);
                } else if (state.sortBy === 'rating') {
                    sorted.sort((a, b) => b.rating - a.rating);
                }
                state.filteredProducts = sorted;
            }
        },
        setSortBy: (state, action: PayloadAction<'price' | 'rating' | null>) => {
            state.sortBy = action.payload;
            const sorted = [...state.filteredProducts];
            if (action.payload === 'price') {
                sorted.sort((a, b) => a.price - b.price);
            } else if (action.payload === 'rating') {
                sorted.sort((a, b) => b.rating - a.rating);
            }
            state.filteredProducts = sorted;
        },
        addToCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.cart[productId] = (state.cart[productId] || 0) + 1;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.cart[productId] > 1) {
                state.cart[productId]--;
            } else {
                delete state.cart[productId];
            }
        },
        clearCart: (state) => {
            state.cart = {};
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    setProducts,
    setSearchQuery,
    setSortBy,
    addToCart,
    removeFromCart,
    clearCart,
    setPage,
} = productSlice.actions;

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default productSlice.reducer;
