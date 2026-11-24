// Vendored from Kaiju-Ind/Utils packages/env/mod.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/**
 * Read explicit configuration sources and validate their text before starting the application. A port can
 * become a checked number instead of remaining an unchecked string at every call site.
 *
 * Start with a record source for tests. At the executable entry point, choose runtime sources and
 * overrides. Mark credentials with secret() so package diagnostics and documentation redact them.
 *
 * Validator adapters are optional imports. The core does not select a validator or read ambient
 * environment variables on import.
 *
 * @example
 * ```ts
 * import * as env from '@utils/env';
 * import * as schema from '@utils/schema';
 * const Service = env.define({
 * 	PORT: env.variable(schema.coerce.number({ integer: true, minimum: 1, maximum: 65535 }), {
 * 		description: 'TCP port used by the service.',
 * 	}),
 * });
 * const values = Service.parseSync(env.record({ PORT: '4321' }));
 * console.log(values.PORT + 1);
 * ```
 *
 * @module
 */
export {
	blank,
	compose,
	define,
	env,
	EnvironmentError,
	EnvironmentValidatorError,
	example,
	isSource,
	manifest,
	merge,
	record,
	requirement,
	requirementReport,
	secret,
	select,
	variable,
} from './standard.ts';
export type {
	ComposeEnvironmentFields,
	EnvironmentDefinition,
	EnvironmentField,
	EnvironmentFieldKind,
	EnvironmentFieldMetadata,
	EnvironmentFieldMetadataInput,
	EnvironmentFields,
	EnvironmentIssue,
	EnvironmentManifest,
	EnvironmentManifestField,
	EnvironmentParseResult,
	EnvironmentRecord,
	EnvironmentRequirement,
	EnvironmentRequirementField,
	EnvironmentRequirementReason,
	EnvironmentRequirementReportField,
	EnvironmentSource,
	EnvironmentSourceInput,
	InferEnvironment,
	InferEnvironmentField,
	InferEnvironmentFields,
} from './standard.ts';
