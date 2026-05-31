type Product = { category: string, rating: number, name: string }

export function getTopRatedInCategory(products: Product[], category: string): Product[] {
	return products
		.filter(product => product.category === category)
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 3);
}