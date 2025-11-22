// Supabase client (browser-safe)
export { createClient } from './lib/supabase/client';

// Auth types and enums (browser-safe)
export { UserRole } from './lib/auth/types';
export type { UserWithRole } from './lib/auth/types';

// Note: Server-side utilities should be imported directly:
// import { createClient } from '@the-bazaar/data-access/server';
// import { getCurrentUser, requireAuth } from '@the-bazaar/data-access/server';
