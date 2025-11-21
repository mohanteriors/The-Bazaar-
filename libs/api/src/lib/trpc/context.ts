import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getCurrentUser, type UserWithRole } from '@the-bazaar/data-access';

export interface Context {
  user: UserWithRole | null;
}

export async function createContext(
  _opts: FetchCreateContextFnOptions
): Promise<Context> {
  const user = await getCurrentUser();

  return {
    user,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
