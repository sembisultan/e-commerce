import { fetchProducts } from '@/app/request';
import ProductDetails from "@/components/productDetails/ProductDetails";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === params.id);

    return {
        title: product ? `${product.title} | E-commerce` : 'Product Not Found',
        description: product?.description
    };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === params.id);

    if (!product) {
        return <div className="container mx-auto px-4 py-8">Product not found</div>;
    }

    return <ProductDetails product={product} />;
}
