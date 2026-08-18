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

/** Root category shared by every DeepScope execution surface. */
export const category = ['kaiju', 'deepscope'] as const;

/** Marker for the LogTape configuration owned by the current injected bundle. */
const CONFIG_KEY = '__kaijuDeepScopeLogTapeConfigV1';
const LOWEST_LEVEL: LogLevel = 'debug';
const META_LEVEL: LogLevel = 'warning';
const BURST_LIMIT = 80;
const BURST_WINDOW_MS = 1_000;
const BURST_KEYS = 256;

/**
 * Configure LogTape for one DeepScope execution surface.
 *
 * WXT-injected content scripts can outlive an extension update. The build-aware
 * marker therefore replaces LogTape configuration left by an older bundle
 * instead of letting a new content script fail during startup.
 */
export function configure(surface: DiagnosticSurface): void {
	type ConfigState = { readonly buildId: string; readonly surface: DiagnosticSurface };
	const runtime = globalThis as typeof globalThis & Record<string, ConfigState | undefined>;
	const buildId = getDiagnosticBuildId();
	const existing = runtime[CONFIG_KEY];
	if (existing?.buildId === buildId && existing.surface === surface) return;

	const consoleSink = createConsoleSink();
	const journalSink = createDiagnosticJournalSink(surface);
	configureSync({
		reset: getConfig() != null,
		sinks: { console: consoleSink, journal: journalSink },
		loggers: [
			{ category: [...category], lowestLevel: LOWEST_LEVEL, sinks: ['console', 'journal'] },
			{ category: ['logtape', 'meta'], lowestLevel: META_LEVEL, sinks: ['console', 'journal'] },
		],
	});

	runtime[CONFIG_KEY] = { buildId, surface };
	get(surface, 'logging').debug('Configured DeepScope logging for {surface}.', { buildId, surface });
}

/** Return a logger below the shared `kaiju.deepscope` category. */
export function get(...suffix: readonly string[]): ReturnType<typeof getLogger> {
	return getLogger([...category, ...suffix]);
}

/**
 * Create the human console projection of diagnostic records.
 *
 * Warning and failure records always pass. Lower-level bursts use LogTape's
 * throttling filter. The durable journal remains a separate sink, so console
 * rate control cannot discard diagnostic history.
 */
function createConsoleSink(): Sink {
	const sink = getConsoleSink();
	const accept = getThrottlingFilter({
		limit: BURST_LIMIT,
		windowMs: BURST_WINDOW_MS,
		maxKeys: BURST_KEYS,
		summary: {
			logger: getLogger([...category, 'console-throttle']),
			level: 'info',
			message: 'Suppressed {suppressed} repeated console diagnostics.',
		},
	});
	return ((record: LogRecord) => {
		if (isImportant(record.level) || accept(record)) sink(record);
	}) as Sink;
}

/** Return whether a level must bypass console throttling. */
function isImportant(level: LogLevel): boolean {
	return level === 'warning' || level === 'error' || level === 'fatal';
}
