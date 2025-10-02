import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/utils/clsx'

import { IProduct } from '@/shared/domain/entities/product.interface'
import styles from './ProdcutGallery.module.css'

interface ProdcutGalleryProps {
	product: IProduct
}

export function ProdcutGallery({ product }: ProdcutGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<div>
			<Image
				src={product.images[currentIndex]}
				alt={product.title}
				width={500}
				height={500}
				className={styles.image}
			/>
			<div className={styles.gallery}>
				{product.images.map((image, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={cn(
							styles.item,
							index === currentIndex
								? 'border-black'
								: 'border-transparent'
						)}
					>
						<Image
							src={image}
							alt={product.title}
							width={100}
							height={100}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
