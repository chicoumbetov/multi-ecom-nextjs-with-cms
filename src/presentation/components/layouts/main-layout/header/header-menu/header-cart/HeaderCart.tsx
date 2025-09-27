import { useRouter } from 'next/navigation'

import { Button } from '@/presentation/components/ui/Button'
import { Heading } from '@/presentation/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/presentation/components/ui/Sheet'

import { PUBLIC_URL } from '@/config/url.config'

import { useCart } from '@/application/hooks/useCart'
import { useProfile } from '@/application/hooks/useProfile'

import { formatPrice } from '@/utils/string/format-price'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cart-item/CartItem'
import { useCheckout } from './useCheckout'

export function HeaderCart() {
	const router = useRouter()

	const { createPayment, isLoadingCreate } = useCheckout()
	const { user } = useProfile()

	const { items, total } = useCart()

	const handleClick = () => {
		if (user) createPayment()
		else router.push(PUBLIC_URL.auth())
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Корзина</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<Heading title='Корзина товаров' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => (
							<CartItem item={item} key={item.id} />
						))
					) : (
						<div className={styles.not_found}>Корзина пустая!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Итого к оплате: {formatPrice(total)}
						</div>
						<Button
							onClick={handleClick}
							variant='primary'
							disabled={isLoadingCreate}
						>
							Перейти к оплате
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
