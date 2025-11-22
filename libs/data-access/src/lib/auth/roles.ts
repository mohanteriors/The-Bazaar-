import { createClient } from '../supabase/server';
import { UserRole, UserWithRole } from './types';

export { UserRole, UserWithRole };

/**
 * Get the current authenticated user with their role
 * Server-side only
 */
export async function getCurrentUser(): Promise<UserWithRole | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch user role from database
  // This would typically query your users table
  // For now, returning a basic structure
  return {
    id: user.id,
    email: user.email || '',
    role: UserRole.SHOPPER, // TODO: Fetch from database
    status: 'ACTIVE',
  };
}

/**
 * Check if user has required role
 */
export async function hasRole(
  requiredRole: UserRole | UserRole[]
): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(user.role);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<UserWithRole> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * Require specific role - throws if user doesn't have role
 */
export async function requireRole(
  requiredRole: UserRole | UserRole[]
): Promise<UserWithRole> {
  const user = await requireAuth();
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (!roles.includes(user.role)) {
    throw new Error('Forbidden: Insufficient permissions');
  }

  return user;
}

/**
 * Check if user is vendor
 */
export async function isVendor(): Promise<boolean> {
  return hasRole(UserRole.VENDOR);
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
}

/**
 * Check if user is super admin
 */
export async function isSuperAdmin(): Promise<boolean> {
  return hasRole(UserRole.SUPER_ADMIN);
}
