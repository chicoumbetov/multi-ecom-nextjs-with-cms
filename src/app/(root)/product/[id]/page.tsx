import { productService } from "@/services/product.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageProps } from "../../../../../.next/types/app/layout";
import { Product } from "./Product";

export const revalidate = 60

export async function generateStaticParams() {
  const products = await productService.getAll()

  const paths = products.map(product => {
    return {
      params: { id: product.id }
    }
  })

  return paths
}

async function getProducts(params: { id: string }) {
  try {
    const product = await productService.getById(params.id)

    const similarProducts = await productService.getSimilar(params.id)

    return { product, similarProducts }
  } catch {
    return notFound()
  }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params
  const { product } = await getProducts(resolved)

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1000,
          alt: product.title
        }
      ]
    }
  }
}

export default async function ProductPage(props: PageProps) {
  const resolved = await props.params
  const id = resolved.id
  const { product, similarProducts } = await getProducts(resolved)

  return (
    <Product
      initialProduct={product}
      similarProducts={similarProducts}
      id={id}
    />
  )
}
