'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/config/url.config'


import { formatPrice } from '@/utils/string/format-price'

import styles from '../Store.module.scss'

import { useGetProducts } from '@/application/hooks/queries/products/useGetProducts'
import { Button } from '@/presentation/components/ui/Button'
import { DataTable } from '@/presentation/components/ui/data-table/DataTable'
import DataTableLoading from '@/presentation/components/ui/data-table/DataTableLoading'
import { Heading } from '@/presentation/components/ui/Heading'
import { IProductColumn, productColumns } from './ProductColumns'

export function Products() {
	const params = useParams<{ storeId: string }>()

	const { products, isLoading } = useGetProducts()

	const formattedProducts: IProductColumn[] = products
		? products.map(product => ({
				id: product.id,
				title: product.title,
				price: formatPrice(product.price),
				category: product.category.title,
				color: product.color.value,
				storeId: product.storeId
			}))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Товары (${products?.length})`}
							description='Все товары вашего магазина'
						/>
						<div className={styles.buttons}>
							<Link
								href={STORE_URL.productCreate(params.storeId)}
							>
								<Button variant='primary'>
									<Plus />
									Создать
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={productColumns}
							data={formattedProducts}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}
