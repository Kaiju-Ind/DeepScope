import {
	configureSync,
	getConfig,
	getConsoleSink,
	getLogger,
	getThrottlingFilter,
	type LogLevel,
	type LogRecord,
	type Sink,
} from '@logtape/logtape';

import type { DiagnosticSurface } from './contracts';
import { getDiagnosticBuildId } from './build';
import { createDiagnosticJournalSink } from './journal';

/** Root category shared by every extension runtime and shared library module. */
export const KAIJU_SITE_SCOPE_LOG_CATEGORY = ['kaiju-site-scope'] as const;

/** Runtime surface that owns LogTape configuration for one execution context. */
export type KaijuSiteScopeLogSurface = DiagnosticSurface;

/** Category suffixes used below the shared `kaiju-site-scope` root category. */
export type KaijuSiteScopeLogCategory = readonly string[];

const LOGTAPE_CONFIGURED_KEY = '__kaijuSiteScopeLogTapeConfigV1';
const DEFAULT_LOWEST_LEVEL: LogLevel = 'debug';
const META_LOWEST_LEVEL: LogLevel = 'warning';
const BURST_LOG_LIMIT = 80;
const BURST_LOG_WINDOW_MS = 1_000;

/**
 * Configure LogTape for the current extension application context.
 *
 * WXT runtime-injected content scripts can outlive an extension update. An old
 * bundle can therefore leave LogTape configured in the isolated world after its
 * extension APIs become invalid. The build-aware marker handles current bundles,
 * while `getConfig()` detects that legacy configuration and deliberately replaces
 * it instead of letting `configureSync()` crash the new content script.
 */
export function configureKaijuSiteScopeLogging(surface: KaijuSiteScopeLogSurface): void {
	type LogConfigState = { readonly buildId: string; readonly surface: KaijuSiteScopeLogSurface };
	const runtime = globalThis as typeof globalThis & Record<string, LogConfigState | undefined>;
	const buildId = getDiagnosticBuildId();
	const existing = runtime[LOGTAPE_CONFIGURED_KEY];
	if (existing?.buildId === buildId && existing.surface === surface) return;

	const consoleSink = createThrottledConsoleSink();
	const journalSink = createDiagnosticJournalSink(surface);
	configureSync({
		reset: getConfig() != null,
		sinks: { console: consoleSink, journal: journalSink },
		loggers: [
			{
				category: [...KAIJU_SITE_SCOPE_LOG_CATEGORY],
				lowestLevel: DEFAULT_LOWEST_LEVEL,
				sinks: ['console', 'journal'],
			},
			{
				category: ['logtape', 'meta'],
				lowestLevel: META_LOWEST_LEVEL,
				sinks: ['console', 'journal'],
			},
		],
	});

	runtime[LOGTAPE_CONFIGURED_KEY] = { buildId, surface };
	getKaijuSiteScopeLogger(surface, 'logging').debug('Configured Kaiju Deepscope logging for {surface}.', {
		buildId,
		surface,
	});
}

/** Create a logger under the shared Kaiju Deepscope category tree. */
export function getKaijuSiteScopeLogger(...category: KaijuSiteScopeLogCategory): ReturnType<typeof getLogger> {
	return getLogger([...KAIJU_SITE_SCOPE_LOG_CATEGORY, ...category]);
}

function createThrottledConsoleSink(): Sink {
	const consoleSink = getConsoleSink();
	const burstFilter = getThrottlingFilter({ limit: BURST_LOG_LIMIT, windowMs: BURST_LOG_WINDOW_MS });
	return ((record: LogRecord) => {
		if (isImportantLevel(record.level) || burstFilter(record)) consoleSink(record);
	}) as Sink;
}

function isImportantLevel(level: LogLevel): boolean {
	return level === 'warning' || level === 'error' || level === 'fatal';
}
