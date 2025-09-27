import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useProfile } from '@/application/hooks/useProfile'
import { Button } from '@/presentation/components/ui/Button'
import { IProduct } from '@/shared/domain/entities/product.interface'
import { userService } from '@/user/infrastructure/user.service'

interface FavoriteButtonProps {
	product: IProduct
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
	const { user } = useProfile()

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => userService.toggleFavorite(product.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
		}
	})

	if (!user) return null

	const isExists = user.favorites.some(favorite => favorite.id === product.id)

	return (
		<Button
			variant='secondary'
			size='icon'
			onClick={() => mutate()}
			disabled={isPending}
		>
			{isExists ? (
				<AiFillHeart color='#F43F5E' className='size-5' />
			) : (
				<AiOutlineHeart className='size-5' />
			)}
		</Button>
	)
}
