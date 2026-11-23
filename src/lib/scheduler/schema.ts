import { z } from 'zod';

import { ANALYSIS_MODES, OBSERVATION_MODES } from '@/lib/messaging/analysis';

/** Current execution-store schema version. Increment only for persisted shape changes. */
export const EXECUTION_SCHEMA_VERSION = 6 as const;

/** Semantic scheduling classes. Lower ranks receive capacity first. */
export const WORK_PRIORITIES = ['interactive', 'foreground', 'background', 'maintenance'] as const;
export const WorkPrioritySchema = z.enum(WORK_PRIORITIES);
export type WorkPriorityType = z.output<typeof WorkPrioritySchema>;

/** Durable states for small scheduler control records. */
export const WORK_STATES = ['queued', 'claimed'] as const;
export const WorkStateSchema = z.enum(WORK_STATES);
export type WorkStateType = z.output<typeof WorkStateSchema>;

/** Source that created an analysis request. */
export const ANALYSIS_SOURCES = ['interactive', 'automatic', 'recovery'] as const;
export const AnalysisSourceSchema = z.enum(ANALYSIS_SOURCES);
export type AnalysisSourceType = z.output<typeof AnalysisSourceSchema>;

/** Work kinds stored by the extension execution database. */
export const WORK_KINDS = ['analysis', 'matcher'] as const;
export const WorkKindSchema = z.enum(WORK_KINDS);
export type WorkKindType = z.output<typeof WorkKindSchema>;

/** Shared execution-control fields. Raw page evidence is deliberately absent. */
const CommonWorkSchema = z.strictObject({
	schemaVersion: z.literal(EXECUTION_SCHEMA_VERSION),
	id: z.string().min(1),
	kind: WorkKindSchema,
	browserSessionId: z.string().min(1),
	windowId: z.number().int().nonnegative(),
	tabId: z.number().int().nonnegative(),
	priority: WorkPrioritySchema,
	priorityRank: z.number().int().min(0).max(3),
	state: WorkStateSchema,
	createdAt: z.number().int().nonnegative(),
	updatedAt: z.number().int().nonnegative(),
	attempt: z.number().int().nonnegative(),
	claimOwner: z.string().min(1).optional(),
	claimToken: z.string().min(1).optional(),
});

/** Persisted intent for one visible-document analysis. */
export const AnalysisWorkSchema = CommonWorkSchema.extend({
	kind: z.literal('analysis'),
	frameId: z.number().int().nonnegative(),
	originHash: z.string().min(1),
	urlHash: z.string().min(1),
	mode: z.enum(ANALYSIS_MODES),
	observe: z.enum(OBSERVATION_MODES),
	source: AnalysisSourceSchema,
});
export type AnalysisWorkType = z.output<typeof AnalysisWorkSchema>;

/** Persisted control state for matcher work. Observation batches remain transient. */
export const MatcherWorkSchema = CommonWorkSchema.extend({
	kind: z.literal('matcher'),
	documentKey: z.string().min(1),
	mode: z.enum(['complete', 'evidence-pass']),
	estimatedBytes: z.number().int().nonnegative(),
});
export type MatcherWorkType = z.output<typeof MatcherWorkSchema>;

/** Any persisted scheduler work record. */
export const WorkSchema = z.discriminatedUnion('kind', [AnalysisWorkSchema, MatcherWorkSchema]);
export type WorkType = z.output<typeof WorkSchema>;
