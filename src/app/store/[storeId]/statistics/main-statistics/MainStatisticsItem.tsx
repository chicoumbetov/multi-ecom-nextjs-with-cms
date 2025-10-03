import CountUp from 'react-countup'

import { formatPrice } from '@/utils/string/format-price'

import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card'
import { IMainStatistics } from '@/shared/domain/entities/statistics.interface'
import styles from './MainStatistics.module.css'
import { getIcon } from './statisctics.util'

interface MainStatisticsItemProps {
	item: IMainStatistics
}

export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
	const Icon = getIcon(item.id)

	return (
		<Card className={styles.card}>
			<CardHeader className={styles.header}>
				<CardTitle>{item.name}</CardTitle>
				<Icon />
			</CardHeader>
			<CardContent className={styles.content}>
				<h2>
					{item.id !== 1 ? (
						<CountUp end={item.value} />
					) : (
						<CountUp end={item.value} formattingFn={formatPrice} />
					)}
				</h2>
			</CardContent>
		</Card>
	)
}
