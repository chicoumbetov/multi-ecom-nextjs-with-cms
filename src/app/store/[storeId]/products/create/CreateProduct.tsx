'use client'

import { useGetCategories } from '@/application/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/application/hooks/queries/colors/useGetColors'
import { ProductForm } from '../ProductForm'

export function CreateProduct() {
	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	return <ProductForm categories={categories || []} colors={colors || []} />
}
