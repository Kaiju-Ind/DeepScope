import type { LogLevel } from '@logtape/logtape';

/** Extension execution contexts that can own diagnostic records. */
export type DiagnosticSurface =
	| 'background'
	| 'content'
	| 'sidepanel'
	| 'offscreen'
	| 'matcher-worker'
	| 'options'
	| 'benchmark';

/** Bounded JSON value accepted by the local diagnostic journal. */
export type DiagnosticValue =
	| string
	| number
	| boolean
	| null
	| readonly DiagnosticValue[]
	| { readonly [key: string]: DiagnosticValue };

/** One persisted LogTape or crash record. */
export type DiagnosticRecord = {
	readonly schemaVersion: 1;
	readonly id: string;
	readonly contextId: string;
	readonly surface: DiagnosticSurface;
	readonly sequence: number;
	readonly timestamp: number;
	/** First timestamp represented when repeated successful diagnostics were compacted. */
	readonly firstTimestamp?: number;
	/** Number of equivalent records represented by this persisted record. */
	readonly repeatCount?: number;
	readonly level: LogLevel;
	readonly category: readonly string[];
	readonly message: string;
	readonly properties: Readonly<Record<string, DiagnosticValue>>;
};

/** Metadata that identifies one execution-context lifetime. */
export type DiagnosticContext = {
	readonly schemaVersion: 1;
	readonly id: string;
	readonly surface: DiagnosticSurface;
	readonly startedAt: number;
	readonly buildId: string;
};

/** Serializable error information retained by crash hooks and worker hosts. */
export type DiagnosticError = {
	readonly name: string;
	readonly message: string;
	readonly stack?: string;
	readonly cause?: DiagnosticValue;
	readonly filename?: string;
	readonly line?: number;
	readonly column?: number;
};

/** Current extension context returned by `runtime.getContexts()`. */
export type DiagnosticRuntimeContext = {
	readonly contextId: string;
	readonly contextType: string;
	readonly tabId?: number;
	readonly windowId?: number;
	readonly frameId?: number;
	readonly documentId?: string;
	readonly documentOrigin?: string;
	readonly documentUrl?: string;
};

/** Matcher work included in a support snapshot. */
export type DiagnosticMatcherJob = {
	readonly jobId: string;
	readonly tabId: number;
	readonly status: string;
	readonly mode: string;
	readonly createdAt: number;
	readonly updatedAt: number;
	readonly completedPartitionCount: number;
	readonly partitionCount: number;
	readonly reason?: string;
	readonly interruptedStatus?: string;
	readonly interruptedAt?: number;
	readonly errorMessage?: string;
};

/** Complete support snapshot shown by the Diagnostics UI. */
export type DiagnosticSnapshot = {
	readonly createdAt: number;
	readonly extension: {
		readonly name: string;
		readonly version: string;
		readonly buildId: string;
	};
	readonly platform?: {
		readonly os?: string;
		readonly arch?: string;
		readonly naclArch?: string;
	};
	readonly storageBytes?: number;
	readonly contexts: readonly DiagnosticRuntimeContext[];
	readonly runs: readonly DiagnosticContext[];
	readonly jobs: readonly DiagnosticMatcherJob[];
	readonly records: readonly DiagnosticRecord[];
};
