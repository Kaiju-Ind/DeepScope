import {
	configureSync,
	getConsoleSink,
	getLogger,
	getThrottlingFilter,
	type LogLevel,
	type LogRecord,
	type Sink,
} from '@logtape/logtape';

import type { DiagnosticSurface } from './contracts';
import { createDiagnosticJournalSink } from './journal';

/** Root category shared by every extension runtime and shared library module. */
export const KAIJU_SITE_SCOPE_LOG_CATEGORY = ['kaiju-site-scope'] as const;

/** Runtime surface that owns LogTape configuration for one execution context. */
export type KaijuSiteScopeLogSurface = DiagnosticSurface;

/** Category suffixes used below the shared `kaiju-site-scope` root category. */
export type KaijuSiteScopeLogCategory = readonly string[];

const LOGTAPE_CONFIGURED_KEY = '__kaijuSiteScopeLogTapeConfiguredV2';
const DEFAULT_LOWEST_LEVEL: LogLevel = 'debug';
const META_LOWEST_LEVEL: LogLevel = 'warning';
const BURST_LOG_LIMIT = 80;
const BURST_LOG_WINDOW_MS = 1_000;

/**
 * Configure LogTape once for the current extension runtime.
 *
 * The console is rate-limited for high-volume debug/info output. The local
 * diagnostic journal is not behind that filter, so records needed after a
 * context failure are retained even when DevTools output is compacted.
 */
export function configureKaijuSiteScopeLogging(surface: KaijuSiteScopeLogSurface): void {
	const runtime = globalThis as typeof globalThis & Record<string, boolean | undefined>;
	if (runtime[LOGTAPE_CONFIGURED_KEY]) return;

	const consoleSink = createThrottledConsoleSink();
	const journalSink = createDiagnosticJournalSink(surface);
	configureSync({
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

	runtime[LOGTAPE_CONFIGURED_KEY] = true;
	getKaijuSiteScopeLogger(surface, 'logging').debug('Configured Kaiju Site Scope logging for {surface}.', { surface });
}

/** Create a logger under the shared Kaiju Site Scope category tree. */
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
