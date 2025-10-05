'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/config/url.config'

import { formatDate } from '@/utils/date/format-date'

import styles from '../Store.module.scss'

import { useGetColors } from '@/application/hooks/queries/colors/useGetColors'
import { Button } from '@/presentation/components/ui/Button'
import { DataTable } from '@/presentation/components/ui/data-table/DataTable'
import DataTableLoading from '@/presentation/components/ui/data-table/DataTableLoading'
import { Heading } from '@/presentation/components/ui/Heading'
import { IColor } from '@/shared/domain/entities/color.interface'
import { colorColumns } from './ColorColumns'

export function Colors() {
	const params = useParams<{ storeId: string }>()

	const { colors, isLoading } = useGetColors()

	const formattedColors: IColor[] = colors
		? colors.map(color => ({
				id: color.id,
				createdAt: formatDate(color.createdAt),
				name: color.name,
				value: color.value,
				storeId: color.storeId
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
							title={`Цвета (${colors?.length})`}
							description='Все цвета вашего магазина'
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.colorCreate(params.storeId)}>
								<Button variant='primary'>
									<Plus />
									Создать
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={colorColumns}
							data={formattedColors}
							filterKey='name'
						/>
					</div>
				</>
			)}
		</div>
	)
}
