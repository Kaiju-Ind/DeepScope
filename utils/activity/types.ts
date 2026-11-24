// Vendored from Kaiju-Ind/Utils packages/activity/types.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import type { ExecutionContext } from '@utils/capability/execution';
import type { Contract, ContractOutput } from '@utils/schema/codec';
import type { DefinitionEntry } from '@utils/collection/catalog';

import type {
	Catalog,
	CatalogSelection,
	DefinitionInput as CatalogDefinitionInput,
} from '@utils/collection/catalog';
import type { Context as BaseContext } from '@utils/context';
import type { EffectDefinitions, EffectEmitter } from '@utils/capability/effect';
import type { Definition as FailureDefinition, Occurrences as FailureOccurrences } from '@utils/result/failure';
import type { PermissionChecker, PermissionRuntime } from '@utils/authz/permission';
import type { ResourceCollection, ResourceDefinition } from '@utils/capability/resource';
import type {
	RequirementDefinition,
	RequirementDocument,
	RequirementInput,
	RequirementRuntime,
} from '@utils/capability/requirement';
import type { ResilienceInput, ResiliencePolicy } from '@utils/capability/resilience';
import type { Result as ExplicitResult } from '@utils/result';
import type {
	ActivityCommandOptions,
	ActivityReference,
	Claim,
	InvocationType,
	WorkflowOperation,
} from '@utils/workflow';
import type {
	EngineDefinition,
	EnginePlacementDocumentType,
	EnginePlacementInputType,
	EnginePlacementType,
} from './engine.ts';

/** Standard Schema contract accepted by activity inputs and results. */
export type ActivitySchema<Input = unknown, Output = Input> = Contract<Input, Output>;

/** Options accepted by `activities.define()`. */
export interface ActivityOptions {
	/** Stable external-work identity used by workflow instructions, providers, and documentation. */
	readonly id: string;
	/** Contract version used to distinguish incompatible activity shapes. */
	readonly version: string;
	/** Human-readable activity purpose used by documentation and diagnostics. */
	readonly description?: string;
	/** Schema that validates activity input before execution. */
	readonly input: ActivitySchema;
	/** Schema that validates successful activity output. */
	readonly result: ActivitySchema;
	/** Expected failure definitions or data declared by this activity. */
	readonly failures?: CatalogDefinitionInput<FailureDefinition>;
	/** One-way consequences this activity can announce. */
	readonly effects?: EffectDefinitions;
	/** Ordered execution targets. Defaults to engine.local; selecting a remote target remains explicit. */
	readonly placement?: EnginePlacementInputType;
	/** Resource definitions or collection available to this activity. */
	readonly resources?: CatalogDefinitionInput<ResourceDefinition>;
	/** Requirements owned directly by this activity. Resource requirements stay on their resources. */
	readonly requirements?: RequirementInput;
	/** Static resilience policies applied at the activity lifecycle. */
	readonly resilience?: ResilienceInput;
}

/** Immutable external-work contract. */
export interface ActivityDefinition<Authoring extends ActivityOptions = ActivityOptions> extends ActivityReference {
	/** Stable discriminant for this activity value. */
	readonly kind: 'activity';
	/** Contract version used to distinguish incompatible activity shapes. */
	readonly version: Authoring['version'];
	/** Exact authored identity retained for typed catalogs and invocation. */
	readonly id: Authoring['id'];
	/** Human-readable activity purpose used by documentation and diagnostics. */
	readonly description?: string;
	/** Standard Schema contract that validates activity input before an attempt starts. */
	readonly input: Authoring['input'];
	/** Standard Schema contract that validates successful activity output before completion. */
	readonly result: Authoring['result'];
	/** Expected failure definitions or data declared by this activity. */
	readonly failures: readonly DefinitionEntry<Authoring['failures']>[];
	/** Declared effect definitions or scoped effect state associated with this activity. */
	readonly effects: readonly DefinitionEntry<Authoring['effects']>[];
	/** Ordered engine placement declaration used before attempt dispatch. */
	readonly placement: EnginePlacementType;
	/** Resource definitions or collection available to this activity. */
	readonly resources: readonly DefinitionEntry<Authoring['resources']>[];
	/** Direct requirements only. Use inspection utilities for reachable requirements. */
	readonly requirements: readonly RequirementDefinition[];
	/** Static resilience policies applied at the activity lifecycle. */
	readonly resilience: readonly ResiliencePolicy[];
}

/** Input value inferred from an activity definition. */
export type ActivityInput<Activity extends ActivityDefinition> = ContractOutput<Activity['input']>;

/** Result value inferred from an activity definition. */
export type ActivityResult<Activity extends ActivityDefinition> = ContractOutput<Activity['result']>;

/** Resource union declared by an activity. */
export type ActivityResources<Activity extends ActivityDefinition> = Activity['resources'][number];

/** Declared failure occurrence union inferred from an activity. */
export type ActivityFailures<Activity extends ActivityDefinition> = FailureOccurrences<Activity['failures'][number]>;

/** One concrete local activity-attempt context. */
export interface ActivityContext<Activity extends ActivityDefinition = ActivityDefinition>
	extends ExecutionContext<ActivityResources<Activity>> {
	/** Permission state for dynamic checks declared by this activity attempt. */
	readonly permissions: PermissionRuntime;
	/** Exact activity definition whose implementation is running. */
	readonly activity: Activity;
	/** Engine definition selected by the Scheduler for this attempt. */
	readonly engine: EngineDefinition;
	/** Stable logical activity-job identity shared by every retry attempt. */
	readonly jobId: string;
	/** Actual pooled host for this attempt. Save it with the exact executor to route later work to the same native resource owner. */
	readonly physicalHost?: import('@utils/workflow').placement.HostType;
	/** One-based attempt number assigned by the Scheduler. */
	readonly attempt: number;
	/** Schema-validated activity input. */
	readonly input: ActivityInput<Activity>;
	/** Temporary permission to finish a saved job attempt. Utils supplies it; local calls have no claim. */
	readonly claim: Claim | undefined;
	/** Report attempt liveness or provider-specific progress to the owning Scheduler. */
	heartbeat(value?: unknown): Promise<void>;
}

/** Concrete behavior bound to one exact activity definition. Placement remains host-owned. */
export interface ActivityImplementation<Activity extends ActivityDefinition = ActivityDefinition> {
	/** Exact definition this behavior implements. */
	readonly definition: Activity;
	/** Perform one activity attempt with validated input and scoped resources. */
	run(ctx: ActivityContext<Activity>): ActivityResult<Activity> | Promise<ActivityResult<Activity>>;
	/** Invoke through the standard activity lifecycle from a durable local host. */
	invoke(options: InvocationType): Promise<ActivityResult<Activity>>;
}

/** Options accepted by `activities.implement()`. */
export interface ActivityImplementationOptions<Activity extends ActivityDefinition> {
	/** Concrete activity behavior bound to the exact definition. */
	run: ActivityImplementation<Activity>['run'];
}

/** Options stored in one serializable workflow activity request. */
export interface ActivityRequestOptions extends ActivityCommandOptions {}

/** Inputs accepted by direct `activities.run()`. */
export interface ActivityRunOptions<Activity extends ActivityDefinition> {
	/** Passed by a durable host. Direct local execution cannot satisfy physical pool placement. */
	readonly location?: import('@utils/workflow').placement.SelectionType;
	/** Exact local implementation to invoke. */
	readonly implementation: ActivityImplementation<Activity>;
	/** Engine identity recorded in the local attempt context. */
	readonly engine: EngineDefinition;
	/** Untrusted input validated against the activity definition before work starts. */
	readonly input: unknown;
	/** Borrowed parent context that owns cancellation and timing above this attempt. */
	readonly ctx: BaseContext;
	/** Borrowed resource collection used for declared lazy resource acquisition. */
	readonly resources: ResourceCollection;
	/** Stable logical job identity supplied by the caller or Scheduler. */
	readonly jobId: string;
	/** Actual pooled host for this attempt. Save it with the exact executor to route later work to the same native resource owner. */
	readonly physicalHost?: import('@utils/workflow').placement.HostType;
	/** Current one-based attempt number. */
	readonly attempt: number;
	/** Temporary permission supplied by the saved-job worker. A local caller cannot create valid permission. */
	readonly claim?: Claim;
	/** Optional policy evaluator used by dynamic permission checks. */
	readonly permission?: PermissionChecker;
	/** Optional authoritative owner for declared effect announcements. */
	readonly effect?: EffectEmitter;
	/** Additional requirement-family interpreters available to this direct host. */
	readonly requirements?: RequirementRuntime;
	/** Skip direct admission requirements when the owning Scheduler already applied them before placement. */
	readonly admitted?: boolean;
	/** Optional liveness callback owned by the activity-attempt authority. */
	readonly heartbeat?: (value?: unknown) => void | Promise<void>;
	/** Optional cooperative pause gate supplied by the owning Task or remote host. */
	readonly checkpoint?: () => Promise<void>;
}

/** Options for one checked local call, without a saved job or retry policy. */
export interface ActivityCallOptions {
	/** Borrow cancellation from this caller. The call never closes the supplied context. */
	readonly ctx?: BaseContext;
	/** Exact current-host engine identity. Defaults to engine.local; no remote engine is selected for you. */
	readonly engine?: EngineDefinition;
	/**
	 * Supply bindings to open resources for this call, or borrow an existing collection
	 * to reuse resources across calls. Omit this when the activity needs no resources.
	 * Bindings receive no native host facilities; use resource.open() for custom host construction.
	 */
	readonly resources?:
		| ResourceCollection
		| import('@utils/capability/resource').ResourceImplementationAny
		| readonly import('@utils/capability/resource').ResourceImplementationAny[]
		| import('@utils/capability/resource').ResourceImplementationSet;
	/** Authoritative evaluator for declared permission checks. Omission grants no permissions. */
	readonly permission?: PermissionChecker;
	/** Owner of declared effects; omission does not invent an effect recipient. */
	readonly effect?: EffectEmitter;
	/** Explicit interpreters for requirement families. Unknown requirements still reject. */
	readonly requirements?: RequirementRuntime;
}

/** Named activity catalog. */
export type ActivityCatalog<Entries extends Readonly<Record<PropertyKey, ActivityDefinition>>> = Catalog<
	Entries[keyof Entries],
	Entries
>;

/** Key-preserving activity catalog selection. */
export type ActivitySelection<
	Entry extends ActivityDefinition,
	Entries extends Readonly<Record<PropertyKey, Entry>>,
> = CatalogSelection<Entry, Entries>;

/** JSON-safe activity documentation. */
export interface ActivityDocument {
	/** Stable external-work identity used by workflow instructions, providers, and documentation. */
	readonly id: string;
	/** Contract version used to distinguish incompatible activity shapes. */
	readonly version: string;
	/** Human-readable activity purpose used by documentation and diagnostics. */
	readonly description?: string;
	/** Standard Schema vendor reported by the input contract for documentation. */
	readonly inputVendor: string;
	/** Standard Schema vendor reported by the result contract for documentation. */
	readonly resultVendor: string;
	/** Expected failure definitions or data declared by this activity. */
	readonly failures: readonly string[];
	/** Effect definitions that code in this activity may announce. */
	readonly effects: readonly string[];
	/** Ordered JSON-safe engine placement documentation. */
	readonly placement: readonly EnginePlacementDocumentType[];
	/** Resource definitions or collection available to this activity. */
	readonly resources: readonly string[];
	/** Requirements owned directly by this activity; reachable dependency requirements remain separate. */
	readonly requirements: readonly RequirementDocument[];
	/** Static resilience policies applied at the activity lifecycle. */
	readonly resilience: readonly string[];
}

/** Explicit result returned by `activities.try()`. */
export type ActivityTryResult<Activity extends ActivityDefinition> = ExplicitResult<
	ActivityResult<Activity>,
	ActivityFailures<Activity>
>;

/** Yieldable workflow request for one activity. */
export type ActivityOperation<Activity extends ActivityDefinition> = WorkflowOperation<
	ActivityResult<Activity>,
	ActivityFailures<Activity>
>;
