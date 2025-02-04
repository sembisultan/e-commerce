import { Metadata } from 'next';

import {fetchProducts} from "@/app/request";
import Header from '@/components/header/header';
import ModalProvider from "@/components/modal/ModalProvider";
import ProductList from '@/components/productList/ProductList';
import {generateCommonMetadata} from "@/utils/metadataConfig";

export async function generateMetadata(): Promise<Metadata> {
    const pageContent = await fetchProducts();
    return generateCommonMetadata(pageContent);
}


export default async function Home() {
    const products = await fetchProducts();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <ModalProvider />
            <main className="pt-20">
                <ProductList initialProducts={products} />
            </main>
        </div>
    );
}
