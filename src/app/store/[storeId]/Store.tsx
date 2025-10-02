'use client'

import { Heading } from '@/presentation/components/ui/Heading'
import styles from './Store.module.css'

export function Store() {
	return (
		<div className={styles.wrapper}>
			<Heading title='Statistics' />
			{/*
			<MainStatistics />
			<MiddleStatistics />
			*/}
		</div>
	)
}
