import { useQuery } from '@tanstack/react-query';
import { createClient } from '@the-bazaar/data-access';

export function useUser() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;
      return user;
    },
    staleTime: Infinity, // User data rarely changes
  });
}
