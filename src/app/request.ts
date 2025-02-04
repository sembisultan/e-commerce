export async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        return data.map((item: any) => ({
            id: String(item.id),
            title: item.title,
            description: item.description,
            price: item.price,
            currency: 'USD',
            image: item.image,
            rating: item.rating.rate
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
