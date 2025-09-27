import { IProduct } from '@/shared/domain/entities/product.interface'

export interface ICatalog {
	title: string
	description?: string
	linkTitle?: string
	link?: string
	products: IProduct[]
}
