'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { productService } from '@/services/product.service'

import { useGetCategories } from '@/application/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/application/hooks/queries/colors/useGetColors'
import { ProductForm } from '../ProductForm'

export function ProductEdit() {
	const params = useParams<{ productId: string }>()

	const { data } = useQuery({
		queryKey: ['get product'],
		queryFn: () => productService.getById(params.productId)
	})

	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	return (
		<ProductForm
			product={data}
			categories={categories || []}
			colors={colors || []}
		/>
	)
}
