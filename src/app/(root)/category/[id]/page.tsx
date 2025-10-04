import type { Metadata } from 'next'

import { Catalog } from '@/presentation/components/ui/catalog/Catalog'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'
import { PageProps } from '../../../../../.next/types/app/layout'

export const revalidate = 60

async function getProducts(params: { id: string }) {
	const products = await productService.getByCategory(params.id)

	const category = await categoryService.getById(params.id)

	return { products, category }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const resolved = await props.params

	const { category, products } = await getProducts(resolved)

	return {
		title: category.title,
		description: category.description,
		openGraph: {
			images: [
				{
					url: products[0].images[0],
					width: 1000,
					height: 1000,
					alt: category.title
				}
			]
		}
	}
}

export default async function CategoryPage(props: PageProps) {
	const resolved = await props.params
	const { category, products } = await getProducts(resolved)

	return (
		<div className='my-6'>
			<Catalog
				title={category.title}
				description={category.description}
				products={products}
			/>
		</div>
	)
}
