import { Metadata } from 'next';

export const generateCommonMetadata = (pageContent: any): Metadata => {
    return {
        title: `${pageContent.title || 'E-commerce Store'} | Shop Online`,
        description: pageContent.description || 'Browse our selection of high-quality products',
        openGraph: {
            title: pageContent.title || 'E-commerce Store',
            description: pageContent.description || 'Browse our selection of high-quality products',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'E-commerce Store'
                }
            ]
        },
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
        alternates: {
            canonical: '/'
        }
    };
};
