'use client'

import { useProfile } from '@/application/hooks/useProfile'
import { Catalog } from '@/presentation/components/ui/catalog/Catalog'

export function Favorites() {
	const { user } = useProfile()

	if (!user) return null

	return (
		<div className='my-6'>
			<Catalog title='Избранное' products={user.favorites} />
		</div>
	)
}
