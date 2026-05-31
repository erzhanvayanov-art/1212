type Product = { name: string, price: number };
type GroupedProducts = { cheap: Product[], medium: Product[], expensive: Product[] };

export function groupProductsByPrice(products: Product[]): GroupedProducts {
	return products.reduce(
		(result, product) => {
			if (product.price < 1000) {
				result.cheap.push(product);
			} else if (product.price <= 5000) {
				result.medium.push(product);
			} else {
				result.expensive.push(product);
			}
			return result;
		},
		{ cheap: [], medium: [], expensive: [] }
	);
}