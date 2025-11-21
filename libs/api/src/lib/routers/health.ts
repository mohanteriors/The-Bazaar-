import { z } from 'zod';
import { router, publicProcedure } from '../trpc/init';

export const healthRouter = router({
  check: publicProcedure.query(() => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }),

  ping: publicProcedure
    .input(z.object({ message: z.string().optional() }))
    .query(({ input }) => {
      return {
        pong: true,
        message: input.message || 'Hello from tRPC!',
      };
    }),
});
