'use client';

import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/core/type';
import { openModal } from '@/store/ModalStore';

import CartModal from '../cart/CartModal';

const Header = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.products.cart);
    const products = useSelector((state: RootState) => state.products.products);

    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [productId, qty]) => {
        const product = products.find(p => p.id === productId);
        return sum + (product ? product.price * qty : 0);
    }, 0);

    const openCart = () => {
        dispatch(openModal({
            id: 'cart',
            content: CartModal,
            size: 'medium',
            isOpen: true
        }));
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">E-commerce Store</h1>
                <button
                    onClick={openCart}
                    className="flex items-center space-x-4 hover:text-blue-600 transition-colors text-gray-600"
                >
                    <div className="flex items-center cursor-pointer">
                        <ShoppingCart className="w-6 h-6 mr-2" />
                        <span className="font-semibold">{totalItems} items</span>
                        <span className="ml-2">
                            (USD {totalPrice.toFixed(2)})
                        </span>
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;
