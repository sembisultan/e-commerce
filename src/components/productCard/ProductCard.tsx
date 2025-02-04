'use client';

import { Star, Plus, Minus } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product, RootState } from '@/core/type';
import { addToCart, removeFromCart } from '@/store/ProductsStore';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const cartQuantity = useSelector((state: RootState) =>
        state.products.cart[product.id] || 0
    );

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addToCart(product.id));
    };

    const handleRemoveFromCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(removeFromCart(product.id));
    };

    return (
        <Link
            href={`/product/${product.id}`}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
        >
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-600">{product.title}</h3>
            <p className="text-gray-600 mb-2">
                {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
            </p>
            <div className="flex items-center mb-2">
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
            <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-gray-600">
                    {product.currency} {product.price.toFixed(2)}
                </span>
                {cartQuantity === 0 ? (
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={handleRemoveFromCart}
                                className="px-2 py-1 hover:bg-gray-100 text-blue-600 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-4 py-1 border-x text-gray-700">
                                {cartQuantity}
                            </span>
                            <button
                                onClick={handleAddToCart}
                                className="px-2 py-1 hover:bg-gray-100 text-blue-600 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;
