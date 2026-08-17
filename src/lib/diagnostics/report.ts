import { browser } from 'wxt/browser';

import { listMatcherJobRecords } from '@/lib/storage/matcher-jobs';
import { redactEvidenceValue } from '@/lib/privacy/redaction';
import { getDiagnosticBuildId } from './build';
import type {
	DiagnosticMatcherJob,
	DiagnosticRuntimeContext,
	DiagnosticSnapshot,
	DiagnosticValue,
} from './contracts';
import { getDiagnosticContexts, getDiagnosticRecords } from './journal';

const DEFAULT_RECORD_LIMIT = 180;
const DEFAULT_JOB_LIMIT = 40;

/** Build the current crash/debug support snapshot without starting detector work. */
export async function getDiagnosticSnapshot(): Promise<DiagnosticSnapshot> {
	const manifest = browser.runtime.getManifest();
	const [contexts, runs, platform, storageBytes, jobs, records] = await Promise.all([
		getRuntimeContexts(),
		getDiagnosticContexts(30),
		getPlatformInfo(),
		getStorageBytes(),
		listMatcherJobRecords().then((values) => values.slice(0, DEFAULT_JOB_LIMIT).map(toDiagnosticMatcherJob)),
		getDiagnosticRecords(DEFAULT_RECORD_LIMIT),
	]);

	return {
		createdAt: Date.now(),
		extension: {
			name: manifest.name,
			version: manifest.version,
			buildId: getDiagnosticBuildId(),
		},
		...(platform ? { platform } : {}),
		...(storageBytes === undefined ? {} : { storageBytes }),
		contexts,
		runs,
		jobs,
		records,
	};
}

/** Format a compact report that friends and family can paste into an issue/chat. */
export function formatDiagnosticReport(snapshot: DiagnosticSnapshot): string {
	const failures = snapshot.records.filter((record) => record.level === 'error' || record.level === 'fatal');
	const warnings = snapshot.records.filter((record) => record.level === 'warning');
	const interrupted = snapshot.jobs.filter((job) => job.reason === 'context-interrupted');
	const active = snapshot.jobs.filter((job) => isActiveMatcherStatus(job.status));
	const lines = [
		'Kaiju Site Scope diagnostic report',
		`Created: ${new Date(snapshot.createdAt).toISOString()}`,
		`Extension: ${snapshot.extension.name} ${snapshot.extension.version}`,
		`Build: ${snapshot.extension.buildId}`,
		`Platform: ${formatPlatform(snapshot.platform)}`,
		`Extension storage: ${snapshot.storageBytes === undefined ? 'unknown' : formatBytes(snapshot.storageBytes)}`,
		`Active contexts: ${snapshot.contexts.length}`,
		`Recent context runs: ${snapshot.runs.length}`,
		`Matcher jobs: ${snapshot.jobs.length} recent, ${active.length} active-looking, ${interrupted.length} interrupted`,
		`Diagnostics: ${snapshot.records.length} recent, ${failures.length} errors/fatals, ${warnings.length} warnings`,
		'',
		'Active extension contexts',
		...formatContexts(snapshot.contexts),
		'',
		'Recent context runs',
		...formatRuns(snapshot.runs.slice(0, 20)),
		'',
		'Recent matcher jobs',
		...formatJobs(snapshot.jobs.slice(0, 12)),
		'',
		'Recent warnings and failures',
		...formatRecords([...failures, ...warnings]
			.sort((left, right) => right.timestamp - left.timestamp)
			.slice(0, 24)),
		'',
		'Last diagnostic records',
		...formatRecords(snapshot.records.slice(0, 36)),
	];
	return lines.join('\n');
}

function asyncUnsupported(): never {
	throw new Error('runtime.getContexts is unavailable.');
}

async function getRuntimeContexts(): Promise<DiagnosticRuntimeContext[]> {
	try {
		const runtime = browser.runtime as typeof browser.runtime & {
			getContexts?: (filter: Record<string, never>) => Promise<readonly Record<string, unknown>[]>;
		};
		const raw = await (runtime.getContexts?.({}) ?? asyncUnsupported());
		return raw.map((context) => ({
			contextId: String(context.contextId ?? 'unknown'),
			contextType: String(context.contextType ?? 'unknown'),
			...(typeof context.tabId === 'number' ? { tabId: context.tabId } : {}),
			...(typeof context.windowId === 'number' ? { windowId: context.windowId } : {}),
			...(typeof context.frameId === 'number' ? { frameId: context.frameId } : {}),
			...(typeof context.documentId === 'string' ? { documentId: redactEvidenceValue(context.documentId, 180) } : {}),
			...(typeof context.documentOrigin === 'string' ? { documentOrigin: redactEvidenceValue(context.documentOrigin, 240) } : {}),
			...(typeof context.documentUrl === 'string' ? { documentUrl: redactEvidenceValue(context.documentUrl, 300) } : {}),
		}));
	} catch {
		return [];
	}
}

async function getPlatformInfo(): Promise<DiagnosticSnapshot['platform'] | undefined> {
	try {
		const info = await browser.runtime.getPlatformInfo();
		return {
			os: String(info.os),
			arch: String(info.arch),
			naclArch: String(info.nacl_arch),
		};
	} catch {
		return undefined;
	}
}

async function getStorageBytes(): Promise<number | undefined> {
	try {
		return await browser.storage.local.getBytesInUse(null);
	} catch {
		return undefined;
	}
}

function toDiagnosticMatcherJob(job: Awaited<ReturnType<typeof listMatcherJobRecords>>[number]): DiagnosticMatcherJob {
	return {
		jobId: job.jobId,
		tabId: job.tabId,
		status: job.status,
		mode: job.mode,
		createdAt: job.createdAt,
		updatedAt: job.updatedAt,
		completedPartitionCount: job.completedPartitionCount,
		partitionCount: job.partitionCount,
		...(job.reason ? { reason: job.reason } : {}),
		...(job.interruptedStatus ? { interruptedStatus: job.interruptedStatus } : {}),
		...(job.interruptedAt === undefined ? {} : { interruptedAt: job.interruptedAt }),
		...(job.errorMessage ? { errorMessage: redactEvidenceValue(job.errorMessage, 500) } : {}),
	};
}

function formatContexts(contexts: readonly DiagnosticRuntimeContext[]): string[] {
	if (!contexts.length) return ['  none or runtime.getContexts unavailable'];
	return contexts.map((context) => {
		const location = [
			context.windowId === undefined ? undefined : `window=${context.windowId}`,
			context.tabId === undefined ? undefined : `tab=${context.tabId}`,
			context.frameId === undefined ? undefined : `frame=${context.frameId}`,
		].filter(Boolean).join(' ');
		return `  ${context.contextType} ${context.contextId}${location ? ` ${location}` : ''}${context.documentUrl ? ` ${context.documentUrl}` : ''}`;
	});
}


function formatRuns(runs: DiagnosticSnapshot['runs']): string[] {
	if (!runs.length) return ['  none'];
	return runs.map((run) => `  ${new Date(run.startedAt).toISOString()} ${run.surface} run=${run.id} build=${run.buildId}`);
}

function formatJobs(jobs: readonly DiagnosticMatcherJob[]): string[] {
	if (!jobs.length) return ['  none'];
	return jobs.map((job) => [
		`  ${new Date(job.updatedAt).toISOString()}`,
		job.jobId,
		job.status,
		job.reason ? `reason=${job.reason}` : undefined,
		job.interruptedStatus ? `previous=${job.interruptedStatus}` : undefined,
		job.interruptedAt === undefined ? undefined : `interrupted=${new Date(job.interruptedAt).toISOString()}`,
		`partitions=${job.completedPartitionCount}/${job.partitionCount}`,
		job.errorMessage ? `error=${job.errorMessage}` : undefined,
	].filter(Boolean).join(' '));
}

function formatRecords(records: DiagnosticSnapshot['records']): string[] {
	if (!records.length) return ['  none'];
	return records.map((record) => {
		const details = formatProperties(record.properties);
		return `  ${new Date(record.timestamp).toISOString()} ${record.level.toUpperCase()} ${record.surface} ${record.category.join('.')} ${record.message}${details ? ` ${details}` : ''}`;
	});
}

function formatProperties(properties: Readonly<Record<string, DiagnosticValue>>): string {
	const entries = Object.entries(properties).filter(([key]) => key !== 'marker').slice(0, 8);
	if (!entries.length) return '';
	return entries.map(([key, value]) => `${key}=${formatValue(value)}`).join(' ');
}

function formatValue(value: DiagnosticValue): string {
	if (typeof value === 'string') return JSON.stringify(value);
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}

function isActiveMatcherStatus(status: string): boolean {
	return status === 'queued' || status === 'dispatching' || status === 'running' || status === 'streaming';
}

function formatPlatform(platform: DiagnosticSnapshot['platform'] | undefined): string {
	if (!platform) return 'unknown';
	return [platform.os, platform.arch, platform.naclArch].filter(Boolean).join(' / ') || 'unknown';
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}
