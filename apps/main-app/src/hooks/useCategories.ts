import { useQuery } from '@tanstack/react-query';
import { createClient } from '@the-bazaar/data-access';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
}

export function useCategories() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('isActive', true)
        .order('order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
    staleTime: 10 * 60 * 1000, // Categories don't change often, cache for 10 minutes
  });
}

export function useCategory(slug: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Category;
    },
    enabled: !!slug,
  });
}
