import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGallery } from '../../../components/product/ProductGallery';
import { ProductInfo } from '../../../components/product/ProductInfo';
import { VendorCard } from '../../../components/product/VendorCard';
import { ProductReviews } from '../../../components/product/ProductReviews';
import { RelatedProducts } from '../../../components/product/RelatedProducts';
import { Breadcrumbs } from '../../../components/product/Breadcrumbs';
import { createClient } from '@the-bazaar/data-access';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string) {
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      vendor:vendors(
        id,
        businessName,
        logo,
        description,
        createdAt,
        storefront:storefronts(
          slug,
          name,
          description,
          banner
        )
      ),
      category:categories(
        id,
        name,
        slug
      ),
      reviews(
        id,
        rating,
        title,
        comment,
        images,
        isVerified,
        createdAt,
        user:users(
          id,
          firstName,
          lastName,
          avatar
        )
      )
    `)
    .eq('slug', slug)
    .eq('isActive', true)
    .single();

  if (error || !product) {
    return null;
  }

  return product;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const images = Array.isArray(product.images) ? product.images : [];

  return {
    title: product.metaTitle || `${product.name} | The Bazaar`,
    description: product.metaDescription || product.description?.substring(0, 160),
    keywords: `${product.name}, ${product.category?.name}, Kenya, buy online`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: images.slice(0, 4),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          category={product.category}
          productName={product.name}
        />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Vendor Card */}
        <div className="mb-12">
          <VendorCard vendor={product.vendor} />
        </div>

        {/* Product Reviews */}
        <div className="mb-12">
          <ProductReviews
            productId={product.id}
            reviews={product.reviews || []}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
