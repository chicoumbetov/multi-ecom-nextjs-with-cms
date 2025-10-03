'use client'

import { Heading } from '@/presentation/components/ui/Heading'
import styles from './Store.module.css'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics'

export function Store() {
	return (
		<div className={styles.wrapper}>
			<Heading title='Statistics' />
			<MainStatistics />
			<MiddleStatistics />
		</div>
	)
}
