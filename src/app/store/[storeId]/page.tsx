import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/presentation/constants/seo.constants'

import { Store } from './Store'

export const metadata: Metadata = {
	title: 'Shop management',
	...NO_INDEX_PAGE
}

export default function StorePage() {
	return <Store />
}
