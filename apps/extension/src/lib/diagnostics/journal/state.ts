import type { DiagnosticContext, DiagnosticRecord } from "../contracts.ts";

export type SuccessfulDiagnosticRateBucket = {
	readonly key: string;
	windowStart: number;
	accepted: number;
	suppressed: number;
	firstSuppressedAt?: number;
	lastSuppressedAt?: number;
	message?: string;
	properties?: Readonly<Record<string, unknown>>;
};

export type DiagnosticJournalState = {
	readonly context: DiagnosticContext;
	sequence: number;
	trimScheduled: boolean;
	pending: DiagnosticRecord[];
	flushTimer: ReturnType<typeof setTimeout> | undefined;
	rateTimer: ReturnType<typeof setTimeout> | undefined;
	rateBuckets: Map<string, SuccessfulDiagnosticRateBucket>;
	flushPromise: Promise<void>;
};
