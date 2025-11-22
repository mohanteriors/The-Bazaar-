import { useQuery } from '@tanstack/react-query';
import { createClient } from '@the-bazaar/data-access';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  vendorId: string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
}

interface UseProductsOptions {
  search?: string;
  categoryId?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  minRating?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';
  page?: number;
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(
            id,
            businessName,
            logo
          ),
          reviews(
            rating
          )
        `)
        .eq('isActive', true)
        .eq('status', 'ACTIVE')
        .order('createdAt', { ascending: false });

      if (options.categoryId) {
        query = query.eq('categoryId', options.categoryId);
      }

      if (options.isFeatured !== undefined) {
        query = query.eq('isFeatured', options.isFeatured);
      }

      // Text search
      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      // Price filters
      if (options.minPrice !== undefined) {
        query = query.gte('price', options.minPrice);
      }
      if (options.maxPrice !== undefined) {
        query = query.lte('price', options.maxPrice);
      }

      // Stock filter
      if (options.inStockOnly) {
        query = query.gt('stock', 0);
      }

      // Sorting
      switch (options.sortBy) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'popular':
          // TODO: Implement popularity metric (views, sales, etc.)
          query = query.order('createdAt', { ascending: false });
          break;
        case 'rating':
          // Note: This is a simplified approach. For production, consider a computed column
          query = query.order('createdAt', { ascending: false });
          break;
        case 'newest':
        default:
          query = query.order('createdAt', { ascending: false });
      }

      // Pagination
      const page = options.page || 1;
      const limit = options.limit || 24;
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) throw error;
      return data as Product[];
    },
    enabled: true,
  });
}

export function useProduct(slug: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, vendor:vendors(*), category:categories(*)')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Product;
    },
    enabled: !!slug,
  });
}
