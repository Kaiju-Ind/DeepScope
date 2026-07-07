import {
	configureSync,
	getConsoleSink,
	getLogger,
	getThrottlingFilter,
	type LogLevel,
} from '@logtape/logtape';

/** Root category shared by every extension runtime and shared library module. */
export const KAIJU_SITE_SCOPE_LOG_CATEGORY = ['kaiju-site-scope'] as const;

/** Runtime surface that owns LogTape configuration for one execution context. */
export type KaijuSiteScopeLogSurface = 'background' | 'content' | 'popup' | 'benchmark' | 'offscreen-worker';

/** Category suffixes used below the shared `kaiju-site-scope` root category. */
export type KaijuSiteScopeLogCategory = readonly string[];

const LOGTAPE_CONFIGURED_KEY = '__kaijuSiteScopeLogTapeConfiguredV1';
const DEFAULT_LOWEST_LEVEL: LogLevel = 'debug';
const META_LOWEST_LEVEL: LogLevel = 'warning';
const BURST_LOG_LIMIT = 80;
const BURST_LOG_WINDOW_MS = 1_000;

/**
 * Configure LogTape once for the current extension runtime.
 *
 * Browser extension entrypoints run in separate JavaScript worlds. The popup,
 * background service worker, and content script each need their own LogTape
 * configuration because global state is not shared across those contexts. A
 * small global guard prevents duplicate configuration when WXT reinjects or hot
 * reloads an entrypoint during development.
 */
export function configureKaijuSiteScopeLogging(surface: KaijuSiteScopeLogSurface): void {
	const runtime = globalThis as typeof globalThis & Record<string, boolean | undefined>;
	if (runtime[LOGTAPE_CONFIGURED_KEY]) {
		return;
	}

	configureSync({
		sinks: {
			console: getConsoleSink(),
		},
		filters: {
			kaijuSiteScopeBurstThrottle: getThrottlingFilter({
				limit: BURST_LOG_LIMIT,
				windowMs: BURST_LOG_WINDOW_MS,
			}),
		},
		loggers: [
			{
				category: [...KAIJU_SITE_SCOPE_LOG_CATEGORY],
				lowestLevel: DEFAULT_LOWEST_LEVEL,
				sinks: ['console'],
				filters: ['kaijuSiteScopeBurstThrottle'],
			},
			{
				category: ['logtape', 'meta'],
				lowestLevel: META_LOWEST_LEVEL,
				sinks: ['console'],
			},
		],
	});

	runtime[LOGTAPE_CONFIGURED_KEY] = true;
	getKaijuSiteScopeLogger(surface, 'logging').debug('Configured Kaiju Site Scope logging for {surface}.', { surface });
}

/** Create a logger under the shared Kaiju Site Scope category tree. */
export function getKaijuSiteScopeLogger(...category: KaijuSiteScopeLogCategory): ReturnType<typeof getLogger> {
	return getLogger([...KAIJU_SITE_SCOPE_LOG_CATEGORY, ...category]);
}
