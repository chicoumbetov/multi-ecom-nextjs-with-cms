import { productService } from "@/services/product.service";
import { IProduct } from "@/shared/domain/entities/product.interface";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageProps } from "../../../../../.next/types/app/layout";
import { Product } from "./Product";

export const revalidate = 60

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateStaticParams() {
  const MAX_RETRIES = 3;
  let products: IProduct[] = [];
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempting to fetch products (Attempt ${attempt})...`);
      products = await productService.getAll();
      
      // If successful, break the loop
      break; 
      
    } catch (error) {
      console.error(`Fetch attempt ${attempt} failed with error: ${error?.toString()}`);
      
      // If it's the last attempt, re-throw the error to halt the build
      if (attempt === MAX_RETRIES) {
        throw new Error("Failed to fetch products after multiple retries. Halting build.");
      }
      
      // Wait before the next retry (exponential backoff is often better, but a fixed delay works too)
      await delay(2000 * attempt); // Wait 2s, 4s, etc.
    }
  }

  if (!products || products.length === 0) {
      throw new Error("generateStaticParams retrieved no products or failed all retries.");
  }
  
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
