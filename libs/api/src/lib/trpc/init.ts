import { initTRPC, TRPCError } from '@trpc/server';
import { type TRPCContext } from './context';
import { UserRole } from '@the-bazaar/data-access';

const t = initTRPC.context<TRPCContext>().create();

/**
 * Public procedure - no authentication required
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure - requires authentication
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

/**
 * Vendor-only procedure
 */
export const vendorProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== UserRole.VENDOR) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
});

/**
 * Admin-only procedure
 */
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (
    ctx.user.role !== UserRole.ADMIN &&
    ctx.user.role !== UserRole.SUPER_ADMIN
  ) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
});

/**
 * Super Admin-only procedure
 */
export const superAdminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== UserRole.SUPER_ADMIN) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
});

export const router = t.router;
export const middleware = t.middleware;
