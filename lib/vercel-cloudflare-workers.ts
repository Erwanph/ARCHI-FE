/**
 * Vercel compatibility for the small `cloudflare:workers` surface used by the
 * inquiry route. Cloudflare builds continue to use the real Workers module;
 * Vercel builds alias that module to this file in `vite.config.ts`.
 */

const runtimeEnv = new Proxy<Record<string, string | undefined>>(
  {},
  {
    get(_target, key) {
      if (typeof key !== 'string' || key === 'DB') return undefined;
      return process.env[key];
    },
  },
);

export const env = runtimeEnv as unknown as Cloudflare.Env;

export function waitUntil(promise: Promise<unknown>) {
  void promise.catch((error) => {
    console.error('Background task failed.', error);
  });
}
