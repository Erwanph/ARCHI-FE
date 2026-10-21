import { sites } from '@openai/sites-vite-plugin';
import { nitro } from 'nitro/vite';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

// Local Cloudflare bindings (formerly .openai/hosting.json, now untracked).
const d1: string | null = 'DB';
const r2: string | null = null;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

const localBindingConfig = {
  main: 'vinext/server/fetch-handler',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  // The Windows preview runtime can fail before Vite starts on machines with an
  // older VC++ runtime. Local previewing may opt into Vinext's Node runtime,
  // while Vercel builds use Nitro and Sites builds retain the Cloudflare adapter.
  const useLocalNodePreview = process.env.ARCHI_LOCAL_DEV === '1';
  const useVercelNitro =
    process.env.VERCEL === '1' || process.env.NITRO_PRESET === 'vercel';
  const cloudflare = useLocalNodePreview || useVercelNitro
    ? null
    : (await import('@cloudflare/vite-plugin')).cloudflare;

  return {
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: useVercelNitro
        ? {
            'cloudflare:workers': fileURLToPath(
              new URL('./lib/vercel-cloudflare-workers.ts', import.meta.url),
            ),
          }
        : undefined,
    },
    optimizeDeps: {
      exclude: ['lucide-react', '@base-ui/react', 'cloudflare:workers'],
      // Base UI is served unbundled, so its CommonJS store shims must be
      // pre-bundled for the browser to receive named ESM exports.
      include: [
        'use-sync-external-store/shim',
        'use-sync-external-store/shim/with-selector',
      ],
    },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      ...(useVercelNitro
        ? nitro({ preset: 'vercel' })
        : [
            sites(),
            ...(cloudflare
              ? [
                  cloudflare({
                    viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
                    config: localBindingConfig,
                  }),
                ]
              : []),
          ]),
    ],
  };
});
