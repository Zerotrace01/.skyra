import { prisma } from '@/lib/db'
import HeroSection from '@/components/home/HeroSection'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import CategorySection from '@/components/home/CategorySection'
import BestSellers from '@/components/home/BestSellers'
import WhySkyra from '@/components/home/WhySkyra'
import CustomerReviews from '@/components/home/CustomerReviews'
import InstagramGrid from '@/components/home/InstagramGrid'
import NewsletterSection from '@/components/home/NewsletterSection'

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return products
}

export default async function HomePage() {
  const products = await getProducts()
  
  const bestSellers = products.filter((p) => p.isBestSeller)
  const newArrivals = products.filter((p) => p.isNew)

  // Get products by category
  const categories = {
    necklaces: products.filter((p) => p.category === 'necklaces'),
    bracelets: products.filter((p) => p.category === 'bracelets'),
    earrings: products.filter((p) => p.category === 'earrings'),
    rings: products.filter((p) => p.category === 'rings'),
    keychains: products.filter((p) => p.category === 'keychains'),
  }

  return (
    <div className="pt-[88px]">
      <HeroSection />
      <CategorySection categories={categories} />
      <FeaturedCollections />
      <BestSellers products={bestSellers} />
      <WhySkyra />
      <CustomerReviews />
      <InstagramGrid />
      <NewsletterSection />
    </div>
  )
}
