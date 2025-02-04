'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/core/type';
import { removeFromCart, clearCart } from '@/store/ProductsStore';

const CartModal = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.products.cart);
    const products = useSelector((state: RootState) => state.products.products);

    const cartItems = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return { product, quantity };
    }).filter(item => item.product);

    const total = cartItems.reduce((sum, { product, quantity }) => {
        return sum + (product?.price || 0) * quantity;
    }, 0);

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                {cartItems.length > 0 && (
                    <button
                        onClick={handleClearCart}
                        className="text-red-500 hover:text-red-700 flex items-center gap-2 text-sm"
                    >
                        <Trash2 size={16} />
                        Clear all
                    </button>
                )}
            </div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map(({ product, quantity }) => (
                            <div key={product?.id} className="flex justify-between items-center border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={product?.image}
                                        alt={product?.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{product?.title}</h3>
                                        <p className="text-gray-500">
                                            {product?.currency} {product?.price} x {quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="font-semibold">
                                        {product?.currency} {((product?.price || 0) * quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleRemoveFromCart(product?.id || '')}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center font-bold text-xl">
                            <span>Total:</span>
                            <span>USD {total.toFixed(2)}</span>
                        </div>
                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;
