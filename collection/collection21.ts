export type Product = { price: number; discount: boolean; inStock: boolean };

export function getDiscountedInStockTotal(products: Product[]): number {
	return products
		.filter(product => product.inStock && product.discount)
		.reduce((total, product) => total + product.price, 0);
}