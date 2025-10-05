'use client'

import { formatDate } from '@/utils/date/format-date'

import styles from '../Store.module.css'

import { useGetReviews } from '@/application/hooks/queries/reviews/useGetReviews'
import { DataTable } from '@/presentation/components/ui/data-table/DataTable'
import DataTableLoading from '@/presentation/components/ui/data-table/DataTableLoading'
import { Heading } from '@/presentation/components/ui/Heading'
import { IReviewColumn, reviewColumns } from './ReviewColumns'

export function Reviews() {
	const { reviews, isLoading } = useGetReviews()

	const formattedReviews: IReviewColumn[] = reviews
		? reviews.map(review => ({
				id: review.id,
				createdAt: formatDate(review.createdAt),
				rating: Array.from({ length: review.rating })
					.map(() => '⭐️')
					.join(' '),
				username: review.user.name
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
							title={`Отзывы (${reviews?.length})`}
							description='Все отзывы в вашем магазине'
						/>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={reviewColumns}
							data={formattedReviews}
						/>
					</div>
				</>
			)}
		</div>
	)
}
