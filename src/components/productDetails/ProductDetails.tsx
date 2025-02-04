'use client';

import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product, RootState } from '@/core/type';
import { addToCart, removeFromCart } from '@/store/ProductsStore';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartQuantity = useSelector((state: RootState) =>
        state.products.cart[product.id] || 0
    );

    const handleAddToCart = () => {
        dispatch(addToCart(product.id));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={handleGoBack}
                className="flex items-center gap-2 text-white hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${
                                    i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                }`}
                            />
                        ))}
                        <span className="ml-2 text-gray-600">{product.rating}</span>
                    </div>

                    <p className="text-white mb-6">{product.description}</p>

                    <div className="text-2xl font-bold mb-6">
                        {product.currency} {product.price.toFixed(2)}
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={handleRemoveFromCart}
                                disabled={cartQuantity === 0}
                                className="px-3 py-2 hover:bg-blue-600 text-white transition-colors disabled:text-gray-400"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-6 py-2 border-x text-white">
                                {cartQuantity}
                            </span>
                            <button
                                onClick={handleAddToCart}
                                className="px-3 py-2 hover:bg-blue-600 text-white transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ShoppingCart size={20} />
                            {cartQuantity === 0 ? 'Add to Cart' : 'Add More'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
