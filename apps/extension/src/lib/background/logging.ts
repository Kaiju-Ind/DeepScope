import * as logging from '../diagnostics/logging.ts';
import * as summary from '../diagnostics/summary.ts';

import type { SiteAnalysis } from "@deepscope/detection/types";

/** Create the runtime-owned logging projections after WXT starts the service worker. */
export function createBackgroundLoggers() {
	const backgroundLogger = logging.get('background');

	/** Emit a concise human summary alongside structured details through the existing background logger. */
	function logBackgroundEvent(event: string, details?: Record<string, unknown>): void {
		backgroundLogger.debug('[kaiju-deepscope][background] {event}{summary}', {
			event,
			summary: summary.format(details, SUMMARY_KEYS, { parenthesize: true }),
			...(details ?? {}),
		});
	}

	/** Record result IDs, count and analysis time; callers must exclude private analyses before using this hostname-bearing summary. */
	function logAnalysisSummary(analysis: SiteAnalysis): void {
		backgroundLogger.info('[kaiju-deepscope] analysis summary', {
			hostname: analysis.hostname,
			resultCount: analysis.results.length,
			technologyIds: analysis.results.map((result) => result.technologyId),
			analyzedAt: analysis.analyzedAt,
		});
	}

	return { logBackgroundEvent, logAnalysisSummary };
}

/** Detail keys shown in each background log line's summary. */
const SUMMARY_KEYS = [
	'tabId',
	'hostname',
	'jobId',
	'mode',
	'refreshKind',
	'matcherMode',
	'kind',
	'partitionId',
	'collectionPassId',
	'collectionPassIds',
	'revision',
	'rejectedByRevision',
	'observationCount',
	'queuedObservationCount',
	'resultCount',
	'storedResultCount',
	'matchCount',
	'candidateRuleCount',
	'completedPartitionCount',
	'partitionCount',
	'status',
	'executor',
	'timingTraceId',
] as const;
