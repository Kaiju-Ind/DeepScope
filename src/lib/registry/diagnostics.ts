/** Severity levels emitted by registry validation and compilation. */
export const REGISTRY_DIAGNOSTIC_SEVERITIES = ['error', 'warning'] as const;

/** Severity attached to one registry diagnostic. */
export type RegistryDiagnosticSeverity = typeof REGISTRY_DIAGNOSTIC_SEVERITIES[number];

/** Stable diagnostic codes used by tests, docs, and future compiler output. */
export type RegistryDiagnosticCode =
	| 'schema.invalid'
	| 'technology.duplicate_id'
	| 'technology.unknown_category'
	| 'relationship.unknown_target'
	| 'rule.duplicate_id'
	| 'rule.unsafe_pattern';

/**
 * Location of a validation or compiler concern inside the registry source.
 *
 * The current source is still a TypeScript object tree, so this path describes
 * the logical object path rather than a file coordinate. A future YAML/JSON
 * loader can attach file, line, and column metadata without changing callers.
 */
export interface RegistryDiagnosticLocation {
	/** Logical path such as `technologies[3].rules[1].pattern`. */
	readonly path: readonly string[];
	/** Technology id when the diagnostic can be tied to one definition. */
	readonly technologyId?: string;
	/** Rule index when the diagnostic can be tied to one rule. */
	readonly ruleIndex?: number;
}

/**
 * One validation or compiler message for registry maintainers.
 *
 * Diagnostics are intentionally data-first. Tests can assert on code and path,
 * while UI or CLI output can decide later how much prose to show.
 */
export interface RegistryDiagnostic {
	/** Whether the diagnostic blocks compiler output or only warns maintainers. */
	readonly severity: RegistryDiagnosticSeverity;
	/** Stable machine-readable reason for the diagnostic. */
	readonly code: RegistryDiagnosticCode;
	/** Human-readable message suitable for test failures and local compiler output. */
	readonly message: string;
	/** Logical source location inside the registry tree. */
	readonly location: RegistryDiagnosticLocation;
}

/** Result returned by schema validation before compiler-only checks run. */
export interface RegistryValidationResult<TValue> {
	/** Parsed registry value when validation succeeds. */
	readonly value?: TValue;
	/** Diagnostics produced while validating the source. */
	readonly diagnostics: readonly RegistryDiagnostic[];
	/** Convenience flag used by compiler callers before they build artifacts. */
	readonly valid: boolean;
}

/** Minimal issue shape returned by Zod and Zod Mini validation errors. */
interface RegistrySchemaIssue {
	/** Human-readable validation failure. */
	readonly message: string;
	/** Logical source path for the invalid value. */
	readonly path: readonly PropertyKey[];
}

/** Minimal error shape consumed by the registry diagnostic adapter. */
interface RegistrySchemaError {
	/** Validation issues reported by the schema library. */
	readonly issues: readonly RegistrySchemaIssue[];
}

/**
 * Convert a Zod-compatible schema error into project diagnostics.
 *
 * Zod reports granular issue paths. This adapter keeps those paths stable and
 * also stores the original message so registry authors can fix the source
 * without learning schema-library internals.
 */
export function diagnosticsFromZodError(error: RegistrySchemaError): RegistryDiagnostic[] {
	return error.issues.map((issue) => ({
		severity: 'error',
		code: 'schema.invalid',
		message: issue.message,
		location: {
			path: issue.path.map(String),
			technologyId: getTechnologyIdFromPath(issue.path),
			ruleIndex: getRuleIndexFromPath(issue.path),
		},
	}));
}

/** Return a one-line summary useful for thrown test failures and logs. */
export function formatRegistryDiagnostics(diagnostics: readonly RegistryDiagnostic[]): string {
	return diagnostics
		.map((diagnostic) => `${diagnostic.severity.toUpperCase()} ${diagnostic.code} ${formatDiagnosticPath(diagnostic.location.path)} ${diagnostic.message}`)
		.join('\n');
}

/** Convert a logical path to a readable location marker. */
export function formatDiagnosticPath(path: readonly string[]): string {
	return path.length ? path.join('.') : '<registry>';
}

/** Create a diagnostic with the common registry shape. */
export function createRegistryDiagnostic(input: {
	readonly severity: RegistryDiagnosticSeverity;
	readonly code: RegistryDiagnosticCode;
	readonly message: string;
	readonly path: readonly string[];
	readonly technologyId?: string;
	readonly ruleIndex?: number;
}): RegistryDiagnostic {
	return {
		severity: input.severity,
		code: input.code,
		message: input.message,
		location: {
			path: input.path,
			technologyId: input.technologyId,
			ruleIndex: input.ruleIndex,
		},
	};
}

function getTechnologyIdFromPath(path: readonly PropertyKey[]): string | undefined {
	return typeof path[1] === 'string' && path[0] === 'technologies' ? path[1] : undefined;
}

function getRuleIndexFromPath(path: readonly PropertyKey[]): number | undefined {
	const ruleMarkerIndex = path.findIndex((segment) => segment === 'rules');
	const rawRuleIndex = ruleMarkerIndex === -1 ? undefined : path[ruleMarkerIndex + 1];
	return typeof rawRuleIndex === 'number' ? rawRuleIndex : undefined;
}
