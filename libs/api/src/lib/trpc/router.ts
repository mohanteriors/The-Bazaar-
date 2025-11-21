import { router } from './init';
import { healthRouter } from '../routers/health';

export const appRouter = router({
  health: healthRouter,
  // Additional routers will be added here:
  // auth: authRouter,
  // products: productsRouter,
  // orders: ordersRouter,
  // vendors: vendorsRouter,
  // admin: adminRouter,
});

export type AppRouter = typeof appRouter;
