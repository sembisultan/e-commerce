'use client';

import { Search, ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product, RootState } from '@/core/type';
import { setProducts, setSearchQuery, setSortBy, setPage } from '@/store/ProductsStore';

import ProductCard from '../productCard/ProductCard';

interface ProductListProps {
    initialProducts: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ initialProducts }) => {
    const dispatch = useDispatch();
    const {
        filteredProducts,
        searchQuery,
        sortBy,
        currentPage,
        itemsPerPage,
    } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(setProducts(initialProducts));
    }, [dispatch, initialProducts]);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="relative">
                    <select
                        value={sortBy || ''}
                        onChange={(e) => dispatch(setSortBy(e.target.value as 'price' | 'rating' | null))}
                        className="appearance-none pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white"
                    >
                        <option value="">Sort by...</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => dispatch(setPage(i + 1))}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
