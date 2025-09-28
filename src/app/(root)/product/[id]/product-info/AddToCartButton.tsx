import { useActions } from "@/application/hooks/useActions"
import { useCart } from "@/application/hooks/useCart"
import { Button } from "@/presentation/components/ui/Button"
import { IProduct } from "@/shared/domain/entities/product.interface"

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<Button
			variant='primary'
			size='lg'
			className='w-full'
			onClick={() =>
				currentElement
					? removeFromCart({ id: currentElement.id })
					: addToCart({
							product,
							quantity: 1,
							price: product.price
						})
			}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}
