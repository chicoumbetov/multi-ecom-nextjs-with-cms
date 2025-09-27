import type { ICartItem } from '@/shared/domain/entities/cart.interface'

export interface ICartInitialState {
	items: ICartItem[]
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
	type: 'minus' | 'plus'
}
