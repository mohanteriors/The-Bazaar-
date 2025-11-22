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
  categoryId?: string;
  isFeatured?: boolean;
  limit?: number;
  offset?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('isActive', true)
        .order('createdAt', { ascending: false });

      if (options.categoryId) {
        query = query.eq('categoryId', options.categoryId);
      }

      if (options.isFeatured !== undefined) {
        query = query.eq('isFeatured', options.isFeatured);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

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
