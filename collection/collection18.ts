type Product = { name: string, price: number, inStock: boolean };

export function getAffordableInStockProducts(products: Product[]): string[] {
	return products
		.filter(product => product.price < 1000 && product.inStock)
		.map(product => product.name);
}
